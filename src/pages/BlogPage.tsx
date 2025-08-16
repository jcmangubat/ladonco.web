import { useEffect, useState } from "react";
import AppLayout from "@/components/AppLayout";
import styles from "../styles/_components/BlogPage.module.css";
import PageIntroBanner from "@/components/ui/PageWrapper";

const BlogPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const blogPosts = [
    {
      id: 1,
      title: "Creating Comfort: 10 Homy Design Ideas That Soothe the Soul",
      date: "Aug 17, 2025",
      category: "Home Living",
      image: "lcs-banner-13.jpg",
      excerpt:
        "In a world that moves fast, your space should slow you down. These homy design ideas blend warmth, simplicity, and emotional ease—perfect for anyone seeking comfort and clarity at home.",
      readTime: "6 min read",
      author: "Charles Reyes",
      tags: ["homy", "interiors", "emotional design", "slow living"],
    },
    {
      id: 2,
      title: "Amazing technologies that helped to create creative works",
      date: "Feb 12, 2023",
      category: "Construction",
      image: "ladon-drone.jpeg",
      excerpt:
        "It's normal to feel anxiety, worry and grief any time you're diagnosed with a condition that's certainly true...",
      readTime: "7 min read",
      author: "Maria Garcia",
      tags: ["technology", "innovation", "construction"],
    },
    {
      id: 3,
      title:
        "Building Forward: Challenges and Innovations in Philippine Construction",
      date: "Aug 17, 2025",
      category: "Infrastructure & Innovation",
      image: "post43.jpg",
      excerpt:
        "From labor shortages and red tape to modular housing and smart cities, the Philippine construction industry is evolving fast. This article explores the sector’s biggest hurdles—like corruption and supply chain delays—alongside its boldest innovations, including BIM, 3D printing, and green building practices.",
      readTime: "8 min read",
      author: "Ladon Infrastructure Desk",
      tags: [
        "Philippines",
        "construction",
        "innovation",
        "urban planning",
        "BIM",
        "green building",
      ],
    },
    {
      id: 4,
      title: "Sustainable construction practices for the future",
      date: "Mar 15, 2023",
      category: "Sustainability",
      image: "post57.jpg",
      excerpt:
        "Sustainable construction is becoming increasingly important as we face global environmental challenges...",
      readTime: "8 min read",
      author: "Sarah Williams",
      tags: ["sustainability", "eco-friendly", "future"],
    },
    {
      id: 5,
      title: "The evolution of modern architecture",
      date: "Mar 22, 2023",
      category: "Architecture",
      image: "lcs-banner-11.jpg",
      excerpt:
        "Architecture has evolved significantly over the centuries, reflecting changes in technology, culture...",
      readTime: "6 min read",
      author: "Michael Torres",
      tags: ["architecture", "history", "modern"],
    },
    {
      id: 6,
      title: "Innovative materials in construction",
      date: "Apr 5, 2023",
      category: "Materials",
      image: "post39.jpg",
      excerpt:
        "The construction industry is constantly evolving with new materials that offer better performance...",
      readTime: "9 min read",
      author: "Jennifer Lee",
      tags: ["materials", "innovation", "technology"],
    },
  ].map((item) => ({
    ...item,
    image: `/assets/images/posts/${item.image}`,
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

  // Function to get category color
  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case "buildings":
        return "#FF5722";
      case "construction":
        return "#4CAF50";
      case "company":
        return "#2196F3";
      case "sustainability":
        return "#8BC34A";
      case "architecture":
        return "#9C27B0";
      case "materials":
        return "#FF9800";
      default:
        return "#607D8B";
    }
  };

  return (
    <div className="overflow-hidden">
      <AppLayout>
        <PageIntroBanner
          backgroundImageUrl="/assets/images/intro/bg-image4.jpg"
          title="Blogs"
          pageName="Blogs"
        >
          {/* Hero Section */}
          <div className={styles.heroSection}>
            <div className="container">
              <div className="row">
                <div className="col-12 text-center">
                  <h1 className={styles.heroTitle}>Our Blog</h1>
                  <p className={styles.heroSubtitle}>
                    Insights, innovations, and industry trends from the world of
                    construction
                  </p>
                </div>
              </div>
            </div>
          </div>

          <section className="padding-large">
            <div className="container">
              {/* Search and Filter Section */}
              <div className={styles.filterSection}>
                <div className="row">
                  <div className="col-lg-6 mb-3 mb-lg-0">
                    <div className={styles.searchContainer}>
                      <input
                        type="text"
                        placeholder="Search articles..."
                        className={styles.searchInput}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <button className={styles.searchButton}>🔍</button>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className={styles.categoryFilter}>
                      {categories.map((category) => (
                        <button
                          key={category}
                          className={`${styles.categoryButton} ${
                            activeCategory === category ? styles.active : ""
                          }`}
                          onClick={() => setActiveCategory(category)}
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
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
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
                            <a href={`/blog/${post.id}`}>{post.title}</a>
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
                              href={`/blog/${post.id}`}
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
              <nav
                aria-label="Page navigation"
                className={styles.paginationContainer}
              >
                <ul className="pagination justify-content-center mt-5">
                  <li className="page-item">
                    <a
                      className={`page-link ${styles.pageLink}`}
                      href="#"
                      aria-label="Previous"
                    >
                      <span aria-hidden="true">«</span>
                    </a>
                  </li>
                  <li className="page-item active">
                    <a className={`page-link ${styles.pageLink}`} href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className={`page-link ${styles.pageLink}`} href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className={`page-link ${styles.pageLink}`} href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a
                      className={`page-link ${styles.pageLink}`}
                      href="#"
                      aria-label="Next"
                    >
                      <span aria-hidden="true">»</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </section>
        </PageIntroBanner>
      </AppLayout>
    </div>
  );
};

export default BlogPage;
