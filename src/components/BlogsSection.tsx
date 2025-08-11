import { useState } from "react";
import styles from "@/styles/_components/BlogSection.module.css";

const BlogsSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const blogPosts = [
    {
      id: 1,
      title: "Top 10 mindblowing architecture buildings in the world",
      date: "Feb 1, 2023",
      category: "Buildings",
      image: "post-item1.jpg",
      excerpt:
        "It's normal to feel anxiety, worry and grief any time you're diagnosed with a condition that's certainly true...",
      readTime: "5 min read",
      author: "Alex Johnson",
      tags: ["architecture", "design", "landmarks"],
    },
    {
      id: 2,
      title: "Amazing technologies that helped to create creative works",
      date: "Feb 12, 2023",
      category: "Construction",
      image: "post-item2.jpg",
      excerpt:
        "It's normal to feel anxiety, worry and grief any time you're diagnosed with a condition that's certainly true...",
      readTime: "7 min read",
      author: "Maria Garcia",
      tags: ["technology", "innovation", "construction"],
    },
    {
      id: 3,
      title: "100 best construction companies around the world",
      date: "Feb 28, 2023", // Fixed invalid date
      category: "Company",
      image: "post-item3.jpg",
      excerpt:
        "It's normal to feel anxiety, worry and grief any time you're diagnosed with a condition that's certainly true...",
      readTime: "10 min read",
      author: "David Chen",
      tags: ["companies", "ranking", "global"],
    },
  ];

  // Function to get category color
  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case "buildings":
        return "#FF5722";
      case "construction":
        return "#4CAF50";
      case "company":
        return "#2196F3";
      default:
        return "#9E9E9E";
    }
  };

  // Function to get category icon
  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case "buildings":
        return "🏛️";
      case "construction":
        return "🏗️";
      case "company":
        return "🏢";
      default:
        return "📝";
    }
  };

  return (
    <section
      id="latest-blog"
      className={`padding-large ${styles.blogsSection}`}
    >
      <div className="container">
        <div className="row">
          <div className="section-header text-uppercase text-center mb-5">
            <h2 className="left-pattern">News Articles</h2>
            <h3 className="mt-2">Read Latest Articles</h3>
            <div className={`${styles.sectionUnderline} mx-auto`}></div>
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
                  {/* Image Container with Overlay */}
                  <div className={styles.imageContainer}>
                    <img
                      src={`/assets/images/${post.image}`}
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
                      <span className={styles.categoryIcon}>
                        {getCategoryIcon(post.category)}
                      </span>
                      {post.category}
                    </div>

                    {/* Read Time */}
                    <div className={styles.readTime}>
                      <span>⏱️</span> {post.readTime}
                    </div>
                  </div>

                  {/* Content */}
                  <div className={styles.contentContainer}>
                    <div className={styles.metaInfo}>
                      <span className={styles.date}>{post.date}</span>
                      <span className={styles.author}>By {post.author}</span>
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
            ))}
          </div>

          {/* <div className="text-center mt-5">
            <a
              href="/blog"
              className={`${styles.viewAllButton} btn-slide btn-medium btn-dark hover-slide-right text-uppercase`}
            >
              <span>All articles</span>
            </a>
          </div> */}

          <div style={{ textAlign: "center" }}>
            <a
              href="/articles"
              className="btn-slide btn-medium btn-dark hover-slide-right text-uppercase mb-5"
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
