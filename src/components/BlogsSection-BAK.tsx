const BlogsSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Top 10 mindblowing architecture buildings in the world",
      date: "Feb 1, 2023",
      category: "Buildings",
      image: "post-item1.jpg",
      excerpt: "It's normal to feel anxiety, worry and grief any time you're diagnosed with a condition that's certainly true..."
    },
    {
      id: 2,
      title: "Amazing technologies that helped to create creatives works",
      date: "Feb 12, 2023",
      category: "Construction",
      image: "post-item2.jpg",
      excerpt: "It's normal to feel anxiety, worry and grief any time you're diagnosed with a condition that's certainly true..."
    },
    {
      id: 3,
      title: "100 best construction company around the world",
      date: "Feb 30, 2023",
      category: "Company",
      image: "post-item3.jpg",
      excerpt: "It's normal to feel anxiety, worry and grief any time you're diagnosed with a condition that's certainly true..."
    }
  ];

  return (
    <section id="latest-blog" className="padding-large">
      <div className="container">
        <div className="row">
          <div className="section-header text-uppercase">
            <h2 className="left-pattern">News Articles</h2>
            <h3>Read Latest Articles</h3>
          </div>
          
          <div className="post-grid d-flex flex-wrap justify-content-center mt-5">
            {blogPosts.map(post => (
              <div key={post.id} className="col-lg-4 col-md-6 mb-3">
                <div className="card-item position-relative">
                  <div className="card border-0">
                    <div className="card-image">
                      <img src={`/assets/images/${post.image}`} alt={post.title} className="img-fluid" />
                    </div>
                  </div>
                  <div className="card-body p-3 position-absolute">
                    <div className="meta-title">
                      <em className="light">{post.date} / {post.category}</em>
                    </div>
                    <h3 className="card-title fs-3 text-uppercase mt-3 light">
                      <a href={`/blog/${post.id}`}>{post.title}</a>
                    </h3>
                    <p className="light">
                      {post.excerpt} 
                      <a href={`/blog/${post.id}`} className="text-decoration-underline">
                        <em>Read more</em>
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="btn-center">
            <a href="/blog" className="btn-slide btn-medium btn-dark hover-slide-right text-uppercase mt-5">
              <span>All articles</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;