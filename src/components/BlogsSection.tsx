import { useEffect, useState } from "react";
import { jarallax } from "jarallax";
import styles from "@/styles/_components/BlogSection.module.css";
import blogCatalog from "./../../public/contents/posts/blogs-catalog.json";
import { slugify } from "@/lib/utils";

// Base64 placeholder image
const placeholderImage =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjVmNWY1Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==";

const BlogsSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  // Sort by date (newest first) and take only top 3
  const sortedPosts = [...blogCatalog]
    .sort((a, b) => {
      // Convert date strings to timestamps for comparison
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA; // Sort in descending order (newest first)
    })
    .slice(0, 3);

  const blogPosts = sortedPosts.map((post) => ({
    ...post,
    date: new Date(post.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    image:
      post.image === "NONE"
        ? placeholderImage
        : `${post.image}`,
  }));

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
      default:
        return "#607D8B";
    }
  };

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case "construction & sustainability":
        return "🌱";
      case "infrastructure development":
        return "🛣️";
      case "architecture & engineering":
        return "🏗️";
      case "construction & infrastructure":
        return "🏗️";
      default:
        return "📝";
    }
  };

  useEffect(() => {
    jarallax(document.querySelectorAll(".jarallax"), {
      speed: 0.5,
    });
  }, []);

  return (
    <section
      id="latest-blog"
      className={`jarallax padding-small ${styles["blogs-section"]}`}
    >
      <img
        className="jarallax-img"
        src="/images/intro/bg-image4.png"
        alt=""
      />
      <div
        className={styles["blogs-section-overlay"]}
        style={{
          backgroundImage:
            "linear-gradient(rgba(18, 77, 170, 0.6), rgb(54, 57, 87))",
          zIndex: 1,
        }}
      ></div>
      <div className="container" style={{ zIndex: 2, position: "inherit" }}>
        <div className="row">
          <div
            className="section-header col-12 col-md-10 offset-md-1 col-lg-10 offset-lg-1"
            style={{
              textShadow: "rgb(0, 0, 0) 1px 1px 2px",
            }}
          >
            <h2 className={`${styles.light} text-uppercase mb-3 left-pattern`}>
              What’s New
            </h2>
            <h3 className={`${styles.light} text-uppercase`}>
              Explore the Latest in Innovation and Strategy
            </h3>
          </div>
          <div className="post-grid d-flex flex-wrap justify-content-center mt-5">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="col-lg-4 col-md-6 mb-5 px-3"
                onMouseEnter={() => setHoveredCard(post.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className={`${styles.blogCard} ${
                    hoveredCard === post.id ? styles.hovered : ""
                  }`}
                >
                  <div className={styles.imageContainer}>
                    <img
                      src={post.image}
                      alt={post.title}
                      className="img-fluid unselectable"
                    />
                    <div className={styles.imageOverlay}></div>
                    <div
                      className={`${styles.categoryBadge} unselectable`}
                      style={{
                        backgroundColor: getCategoryColor(post.category),
                      }}
                    >
                      <span className={styles.categoryIcon}>
                        {getCategoryIcon(post.category)}
                      </span>
                      {post.category}
                    </div>
                    <div className={`${styles.readTime} unselectable`}>
                      <span>⏱️</span> {post.readTime}
                    </div>
                  </div>
                  <div className={styles.contentContainer}>
                    <div className={styles.metaInfo}>
                      <span className={styles.date}>{post.date}</span>
                      <span className={styles.author}>By {post.author}</span>
                    </div>
                    <h3 className={styles.cardTitle}>
                      <a href={`/blogs/${slugify(post.title)}`}>{post.title}</a>
                    </h3>
                    <p className={styles.excerpt}>{post.excerpt}</p>
                    <div className={styles.tags}>
                      {post.tags.map((tag, index) => (
                        <span key={index} className={styles.tag}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className={`${styles.readMoreContainer} unselectable`}>
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
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <a
              href="/blogs"
              className="btn-slide btn-medium btn-dark hover-slide-right text-uppercase mb-5 unselectable"
              draggable={false}
            >
              <span>See More Articles...</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;
