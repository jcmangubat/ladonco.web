import { useEffect, useState } from "react";
import { jarallax } from "jarallax";

import styles from "@/styles/_components/BlogSection.module.css";

const BlogsSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

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
        src="/assets/images/intro/bg-image4.png"
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
          {/* <div className="section-header text-uppercase text-center mb-5">
            <h2 className="left-pattern">News Articles</h2>
            <h3 className="mt-2"></h3>
            <div className={`${styles.sectionUnderline} mx-auto`}></div>
          </div> */}

          <div
            //className="section-header offset-lg-2"
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
                  {/* Image Container with Overlay */}
                  <div className={styles.imageContainer}>
                    <img
                      src={`/assets/images/posts/${post.image}`}
                      alt={post.title}
                      className="img-fluid unselectable"
                    />
                    <div className={styles.imageOverlay}></div>

                    {/* Category Badge */}
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

                    {/* Read Time */}
                    <div className={`${styles.readTime} unselectable`}>
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
                    <div className={`${styles.readMoreContainer} unselectable`}>
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
