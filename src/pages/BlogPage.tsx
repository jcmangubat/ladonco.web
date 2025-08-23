import { useEffect, useState } from "react";
import AppLayout from "@/components/AppLayout";
import styles from "../styles/_pages/BlogPage.module.css";
import PageIntroBanner from "@/components/ui/PageWrapper";
import blogCatalog from "@/contents/blogs-catalog.json";
import { slugify } from "@/lib/utils";

// Base64 placeholder image
const placeholderImage =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjVmNWY1Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==";

const BlogPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;

  // Process blog data: sort by date and format
  const blogPosts = [...blogCatalog]
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA; // Newest first
    })
    .map((post) => ({
      ...post,
      date: new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      image: post.image === "NONE" ? placeholderImage : post.image,
    }));

  // Extract unique categories
  const categories = [
    "All",
    ...new Set(blogPosts.map((post) => post.category)),
  ];

  // Filter posts based on active category and search query
  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Function to get category color
  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case "construction & sustainability":
        return "#4CAF50";
      case "infrastructure development":
        return "#2196F3";
      case "architecture & engineering":
        return "#FF9800";
      case "construction & infrastructure":
        return "#9C27B0";
      case "home living":
        return "#8BC34A";
      case "sustainability":
        return "#009688";
      case "architecture":
        return "#673AB7";
      case "materials":
        return "#FF5722";
      default:
        return "#607D8B";
    }
  };

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="overflow-hidden">
      <AppLayout>
        <PageIntroBanner
          backgroundImageUrl="/assets/images/intro/bg-image13.jpg"
          title="Our Blogs"
          pageName="Blogs"
        >
          {/* Hero Section */}
          <div className={styles.heroSection}>
            <div className="container">
              <div className="row">
                <div className="col-12 text-center">
                  <h1 className={styles.heroTitle}>The LadonCo Journal</h1>
                  <p className={styles.heroSubtitle}>
                    Fresh perspectives, practical innovations, and evolving
                    trends shaping the construction industry. Insights,
                    innovations, and industry trends from the world of the civil
                    construction.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <section className="padding-large">
            <div className="container">
              {/* Search and Filter Section */}
              <div id="search" className={`{styles.filterSection}`}>
                <div className="row mb-5">
                  <div className="col-lg-12 mb-3 mb-lg-0">
                    <div className={styles.searchContainer}>
                      <input
                        type="text"
                        placeholder="Search articles..."
                        className={styles.searchInput}
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setCurrentPage(1); // Reset to first page on search
                        }}
                      />
                      <button className={styles.searchButton}>🔍</button>
                    </div>
                  </div>
                </div>
                <div id="categories" className="row mb-5">
                  <div className="col-lg-12">
                    <div className={`fs-6 ${styles.categoryFilter}`}>
                      {categories.map((category) => (
                        <button
                          key={category}
                          className={`${styles.categoryButton} ${
                            activeCategory === category ? styles.active : ""
                          }`}
                          onClick={() => {
                            setActiveCategory(category);
                            setCurrentPage(1); // Reset to first page on category change
                          }}
                          style={
                            activeCategory === category
                              ? { backgroundColor: getCategoryColor(category) }
                              : {}
                          }
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Blog Posts Grid */}
              <div className="post-grid d-flex flex-wrap justify-content-center mt-5">
                {currentPosts.length > 0 ? (
                  currentPosts.map((post) => (
                    <div key={post.id} className="col-lg-4 col-md-6 mb-4 px-3">
                      <div className={styles.blogCard}>
                        {/* Image Container */}
                        <div className={styles.imageContainer}>
                          <img
                            src={post.image}
                            alt={post.title}
                            className="img-fluid"
                          />
                          <div className={styles.imageOverlay}></div>
                          {/* Category Badge */}
                          <div
                            className={styles.categoryBadge}
                            style={{
                              backgroundColor: getCategoryColor(post.category),
                            }}
                          >
                            {post.category}
                          </div>
                          {/* Read Time */}
                          <div className={styles.readTime}>
                            ⏱️ {post.readTime}
                          </div>
                        </div>
                        {/* Content */}
                        <div className={styles.contentContainer}>
                          <div className={styles.metaInfo}>
                            <span className={styles.date}>{post.date}</span>
                            <span className={styles.author}>
                              By {post.author}
                            </span>
                          </div>
                          <h3 className={styles.cardTitle}>
                            <a href={`/blogs/${slugify(post.title)}`}>
                              {post.title}
                            </a>
                          </h3>
                          <p className={styles.excerpt}>{post.excerpt}</p>
                          {/* Tags */}
                          <div className={styles.tags}>
                            {post.tags.map((tag, index) => (
                              <span key={index} className={styles.tag}>
                                #{tag}
                              </span>
                            ))}
                          </div>
                          {/* Read More Button */}
                          <div className={styles.readMoreContainer}>
                            <a
                              href={`/blogs/${slugify(post.title)}`}
                              className={styles.readMoreButton}
                            >
                              Read Article
                              <span className={styles.arrow}>→</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12 text-center py-5">
                    <h3 className={styles.noResults}>No articles found</h3>
                    <p className={styles.noResultsText}>
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                )}
              </div>

              {/* Enhanced Pagination */}
              {totalPages > 1 && (
                <nav
                  aria-label="Page navigation"
                  className={styles.paginationContainer}
                >
                  <ul className="pagination justify-content-center mt-5">
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <a
                        className={`page-link ${styles.pageLink}`}
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) paginate(currentPage - 1);
                        }}
                        aria-label="Previous"
                      >
                        <span aria-hidden="true">«</span>
                      </a>
                    </li>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (number) => (
                        <li
                          key={number}
                          className={`page-item ${
                            currentPage === number ? "active" : ""
                          }`}
                        >
                          <a
                            className={`page-link ${styles.pageLink}`}
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              paginate(number);
                            }}
                          >
                            {number}
                          </a>
                        </li>
                      )
                    )}

                    <li
                      className={`page-item ${
                        currentPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <a
                        className={`page-link ${styles.pageLink}`}
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < totalPages)
                            paginate(currentPage + 1);
                        }}
                        aria-label="Next"
                      >
                        <span aria-hidden="true">»</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              )}
            </div>
          </section>
        </PageIntroBanner>
      </AppLayout>
    </div>
  );
};

export default BlogPage;
