import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import AppLayout from "@/components/AppLayout";
import PageIntroBanner from "@/components/PageIntroSection";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { getServiceCategories } from "@/data/service-Offerings";

const ServiceDetailsPage = () => {
  const { srvcGrp, slug } = useParams();
  console.log("Params:", srvcGrp, slug);

  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const mdLocation = `/assets/contents/service-details/${srvcGrp}/${slug}.md`;
        console.log(`mdlocation : ${mdLocation}`);

        const response = await fetch(mdLocation);
        const text = await response.text();
        setMarkdown(text);
      } catch (error) {
        setMarkdown("⚠️ Sorry, this service detail couldn't be loaded.");
      }
    };

    fetchMarkdown();
  }, [slug, srvcGrp]);

  const categories = getServiceCategories()
    .map((group) => ({
      ...group,
      //filter out a specific service by the same slug as this page will be displaying
      services: group.services.filter((service) => service.slug !== slug),
    }))
    .filter((group) => group.services.length > 0);

  return (
    <div className="overflow-hidden">
      <AppLayout>
        <PageIntroBanner
          backgroundImageUrl="/assets/images/intro/bg-image7.jpg"
          title="Service Details"
          pageName="ServiceDetails"
        >
          <div className="post-wrap py-5 no-padding-bottom">
            <div className="container">
              <div className="row flex-md-row-reverse g-5 mt-4">
                <main className="post-grid col-md-9">
                  <div className="row">
                    <article className="post-item">
                      <div className="section-header mb-5">
                        <h2 className="text-uppercase mb-3 left-pattern">
                          providing the best
                        </h2>
                      </div>
                      <div className="md-container">
                        <ReactMarkdown
                          rehypePlugins={[rehypeRaw]}
                          children={markdown}
                        />
                      </div>
                    </article>
                  </div>
                </main>

                <aside className="col-md-3">
                  <div className="post-sidebar">
                    <div className="widget block-tag border p-4 mb-5">
                      <h5 className="widget-title text-uppercase border-bottom pb-3 mb-3">
                        Start Your Project With Us
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
                        Other Services We Offer
                      </h5>

                      <ul className="list-unstyled">
                        {categories.map((group) => (
                          <li key={group.title} className="mt-20 mb-3">
                            <strong
                              className="d-block mb-2 text-uppercase"
                              style={{ color: group.accent }}
                            >
                              <b>
                                {group.icon}
                                {group.title}
                              </b>
                            </strong>
                            <ul className="list-unstyled ms-3">
                              {group.services.map((service) => (
                                <li key={service.slug} className="mb-2">
                                  <a
                                    href={`/servicedetails/${group.title
                                      .toLowerCase()
                                      .replace(/ & | /g, "-")}/${service.slug}`}
                                    className="item-anchor"
                                  >
                                    {/* <Icon
                                      icon="ri:arrow-right-s-line"
                                      className="text-gray-600 h-5 w-5"
                                    /> */}
                                    {service.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* <div className="widget sidebar-recent-post mb-5">
                      <h5 className="widget-title text-uppercase border-bottom pb-3 mb-3">
                        Recent Posts
                      </h5>
                      <div className="sidebar-post-item d-flex justify-content-center">
                        <div className="row">
                          <div className="col-md-4">
                            <div className="image-holder">
                              <a href="#">
                                <img
                                  src="assets/images/projects-item9.jpg"
                                  alt="blog"
                                  className="img-fluid mt-2"
                                />
                              </a>
                            </div>
                          </div>
                          <div className="col-md-8">
                            <div className="sidebar-post-content text-uppercase">
                              <div className="post-meta fs-6 text-secondary">
                                <span className="meta-date">jul 11, 2022</span>
                              </div>
                              <h5 className="post-title">
                                <a href="#">How to clean home properly</a>
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="sidebar-post-item d-flex justify-content-center">
                        <div className="row">
                          <div className="col-md-4">
                            <div className="image-holder">
                              <a href="#">
                                <img
                                  src="assets/images/projects-item3.jpg"
                                  alt="blog"
                                  className="img-fluid mt-2"
                                />
                              </a>
                            </div>
                          </div>
                          <div className="col-md-8">
                            <div className="sidebar-post-content text-uppercase">
                              <div className="post-meta fs-6 text-secondary">
                                <span className="meta-date">jul 18, 2022</span>
                              </div>
                              <h5 className="post-title">
                                <a href="#">Top 10 hacks for renovation </a>
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="sidebar-post-item d-flex justify-content-center">
                        <div className="row">
                          <div className="col-md-4">
                            <div className="image-holder">
                              <a href="#">
                                <img
                                  src="assets/images/projects-item2.jpg"
                                  alt="blog"
                                  className="img-fluid mt-2"
                                />
                              </a>
                            </div>
                          </div>
                          <div className="col-md-8">
                            <div className="sidebar-post-content text-uppercase">
                              <div className="post-meta fs-6 text-secondary">
                                <span className="meta-date">Aug 21, 2022</span>
                              </div>
                              <h5 className="post-title">
                                <a href="#">Best tips for construction</a>
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </PageIntroBanner>
      </AppLayout>
    </div>
  );
};

export default ServiceDetailsPage;
