// React and hooks
import { useEffect, useState } from "react";
// Routing
import { Link, useParams } from "react-router-dom";
// Markdown rendering
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
// Metadata parsing
import matter from "gray-matter";
// SEO
import { Helmet } from "react-helmet";
// App layout and UI
import AppLayout from "@/components/AppLayout";
import PageIntroBanner from "@/components/ui/PageWrapper";
// Utilities
import { slugify, stripFrontmatter } from "@/lib/utils";
// Styles
import styles from "@/styles/_pages/BlogDetailsPage.module.css";
import { Components } from "node_modules/react-markdown/lib";

// Define the structure of a blog article
// This should match the structure of your blog articles in the catalog
type BlogArticle = {
  id: number;
  title: string;
  slug: string;
  topic: string;
  date: string;
  category: string;
  image: string;
  excerpt: string;
  readTime: string;
  author: string;
  tags: string[];
  fileName: string;
};

// Parse metadata from the article content
const SEOHead = ({ title, date, excerpt, tags, author, image }) => (
  <Helmet>
    <title>{title} | LadonCo</title>
    <meta name="description" content={excerpt} />
    <meta name="keywords" content={tags.join(", ")} />
    <meta property="article:published_time" content={date} />
    <meta property="article:published" content={date} />
    <meta property="article:modified_time" content={date} />
    <meta property="article:modified" content={date} />
    <meta property="article:author" content={author} />
    <meta property="article:section" content="Blog" />
    <meta property="article:tag" content={tags.join(", ")} />

    <meta property="article:section" content="Blog" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={excerpt} />
    <meta property="og:author" content={author} />
    <meta property="og:image" content={image} />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:creator" content="@ladonCoPH" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={excerpt} />
    <meta name="twitter:author" content={author} />
    <meta name="twitter:image" content={image} />
  </Helmet>
);

// Define the components for rendering markdown
// This allows us to customize how certain elements are rendered
const markdownComponents: Components = {
  h1: ({ node, ...props }) => <h1 className="fs-2 fw-bold mb-4" {...props} />,
  h2: ({ node, ...props }) => <h2 className="fs-3 fw-bold mb-3" {...props} />,
  h3: ({ node, ...props }) => (
    <h3 className="fs-4 fw-semibold mb-3" {...props} />
  ),
  p: ({ node, ...props }) => <p className="lh-lg text-dark mb-3" {...props} />,
  ul: ({ node, ...props }) => <ul className="lh-lg ps-4 mb-3" {...props} />,
  ol: ({ node, ...props }) => <ol className="lh-lg ps-4 mb-3" {...props} />,
  li: ({ node, ...props }) => <li className="mb-2" {...props} />,
  blockquote: ({ node, ...props }) => (
    <blockquote className="lh-lg text-secondary mb-4" {...props} />
  ),
  code: ({
    node,
    inline,
    className,
    children,
    ...props
  }: {
    node: any;
    inline?: boolean;
    className?: string;
    children?: React.ReactNode;
  }) =>
    inline ? (
      <code
        className="bg-light px-1 rounded"
        {...props}
        style={{ fontFamily: "Georgia, serif", fontSize: "0.9rem" }}
      >
        {children}
      </code>
    ) : (
      <pre
        className="bg-light p-3 rounded overflow-auto"
        style={{ fontFamily: "Georgia, serif", fontSize: "1rem" }}
        {...props}
      >
        <code className={className}>{children}</code>
      </pre>
    ),
};

const BlogDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blogArticle, setBlogArticle] = useState<BlogArticle | null>(null);
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCatalog = async () => {
    try {
      const response = await fetch("/contents/blogs-catalog.json");
      if (!response.ok) {
        throw new Error(`Failed to load catalog (status ${response.status})`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Invalid JSON in blogs-catalog.json: ${error.message}`);
    }
  };

  const fetchMarkdown = async (fileName: string) => {
    try {
      const response = await fetch(`/contents/posts/${fileName}`);
      if (!response.ok) {
        throw new Error(`Failed to load markdown (status ${response.status})`);
      }

      const rawMarkdown = await response.text();
      const content = stripFrontmatter(rawMarkdown);
      return content;
    } catch (error) {
      throw new Error(`Failed to load markdown: ${error.message}`);
    }
  };

  useEffect(() => {
    if (!slug) return;

    const loadArticle = async () => {
      try {
        const catalogData = await fetchCatalog();
        const normalized = catalogData.map((article) => ({
          ...article,
          slug: article.slug || slugify(article.title),
        })) as BlogArticle[];
        console.log("Normalized articles:", normalized);
        console.log("Looking for slug:", slug);

        const match = normalized.find((article) => article.slug === slug);
        if (!match) {
          console.warn(`No article found for slug "${slug}"`);
          setLoading(false);
          return;
        }

        setBlogArticle(match);
        const content = await fetchMarkdown(match.fileName);
        setMarkdownContent(content);
      } catch (error) {
        console.error("🔥 Article fetch error:", error.message);
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [slug]);

  if (loading) return <p>Loading article...</p>;
  if (!blogArticle) return <p>Article not found.</p>;

  return (
    <div className="overflow-hidden">
      <AppLayout>
        <SEOHead
          title={blogArticle.title}
          excerpt={blogArticle.excerpt}
          tags={blogArticle.tags}
          author={blogArticle.author}
          image={blogArticle.image}
          date={blogArticle.date}
        />
        <PageIntroBanner
          backgroundImageUrl="/assets/images/intro/bg-image4.jpg"
          title={blogArticle.title}
          pageName={
            <>
              <Link to="/blogs" className="text-decoration-none text-primary">
                Blogs
              </Link>
              {" / "}
              {blogArticle.topic}
            </>
          }
        />

        {/* Main content area */}
        <div className="post-wrap py-3 no-padding-bottom">
          <div className="container">
            <div className="row flex-md-row-reverse mt-5 mb-5">
              <main className="post-grid col-md-9">
                {/* Article Content */}
                <div className="row">
                  <article className="post-item">
                    <div className="section-header mb-5">
                      <h2 className="text-uppercase mb-3 left-pattern">
                        {blogArticle.author}
                      </h2>
                      <h4 className="mb-3">
                        <p className="text-muted">{blogArticle.excerpt}</p>
                      </h4>
                      <img
                        src={blogArticle.image}
                        alt={blogArticle.title}
                        className="mt-10 w-100 responsive-image"
                      />
                    </div>

                    <div className="md-container markdown-responsive">
                      <ReactMarkdown
                        //remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                        //components={markdownComponents}
                        children={markdownContent}
                      />
                    </div>
                  </article>
                </div>

                {/* Tags */}
                <div className="row">
                  {blogArticle.tags && blogArticle.tags.length > 0 && (
                    <div className="mt-3 pt-2 border-top">
                      <h6 className="text-muted mb-3">Tags</h6>
                      <div className="d-flex flex-wrap gap-2">
                        {blogArticle.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="badge bg-primary text-light"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </main>

              <aside className="col-md-3">
                <div className="post-sidebar">
                  <div className="widget block-tag border p-4 mb-5">
                    <h5 className="widget-title text-uppercase border-bottom pb-3 mb-3">
                      Start Now Your Project With Us
                    </h5>
                    <p className="">
                      Site visits, planning sessions, and trusted advice—just
                      one click away.
                    </p>
                    <div className="">
                      <a
                        href="/contact"
                        className="btn-slide btn-medium btn-dark hover-slide-right text-uppercase"
                      >
                        <span>Get a Free Quote</span>
                      </a>
                    </div>
                  </div>

                  <div className="widget sidebar-categories border p-4 mb-5">
                    <h5 className="widget-title text-uppercase border-bottom pb-3 mb-3">
                      Other Articles
                    </h5>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </AppLayout>
    </div>
  );
};

export default BlogDetailsPage;
