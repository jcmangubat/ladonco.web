import AppLayout from "@/components/AppLayout";
import PageIntroBanner from "@/components/PageIntroSection";
import React, { useEffect, useState } from "react";
import ProjectsGrid from "@/components/ui/projects-grid";
import { useNavigate } from "react-router-dom";

type Project = {
  projectName: string;
  slug: string;
  region: string;
  dateCompleted?: string;
  isFeatured?: boolean;
  assetPrime: string;
  description: string;
  assetsRef: string;
};

const ProjectsPage = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/assets/contents/projects/index.json")
      .then((res) => res.json())
      .then((data) => {
        const normalized = data.map((p: any) => ({
          projectName: p["project-name"],
          slug:
            p["slug"] || p["project-name"].toLowerCase().replace(/\s+/g, "-"),
          region: p.region,
          dateCompleted: p["date-completed"],
          isFeatured: p["is-featured"],
          assetPrime: p["asset-prime"],
          description: p.description,
          assetsRef: p["assets-ref"],
        }));
        setProjects(normalized);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load projects:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="overflow-hidden">
      <AppLayout>
        <PageIntroBanner
          backgroundImageUrl="/assets/images/intro/bg-image4.jpg"
          title="Projects"
          pageName="Projects"
        >
          {/* <section id="projects" className="mt-5 pt-5">
            <div
              className="vertical-element aos-init aos-animate"
              data-aos="fade-up"
            >
              <div className="container">
                <div className="row d-flex align-items-center">
                  <div className="col-md-5">
                    <div className="image-holder">
                      <img
                        src="assets/images/ladon-founder.png"
                        alt="Charlemagne Reyes"
                        className="img-fluid"
                        style={{
                          backgroundColor: "white",
                          padding: "75px",
                          borderRadius: "18px",
                          overflow: "hidden",
                          display: "inline-block",
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div className="section-element ps-0 p-5">
                      <div className="section-header text-uppercase mb-4">
                        <h2 className="left-pattern">About Us</h2>
                        <h3>Our Story & Mission</h3>
                      </div>

                      <p>
                        Ladon Construction Services was founded in 1999 by
                        Charlemagne E. Reyes in Dagupan City, PCAB License
                        50103. Over two decades and 21 years of hands-on
                        experience, we’ve grown from a small crew into a
                        full-service construction partner. From MEP and civil
                        works to residential, commercial, and institutional
                        projects nationwide, our purpose has always been the
                        same: building with integrity, innovation, and a
                        commitment to lasting impact.
                      </p>

                      <p>
                        Our mission is twofold: to help build the Kingdom of God
                        by supporting church facilities managers in maintaining,
                        improving, and expanding sacred spaces—and to operate as
                        an enterprise grounded in dignity, integrity, and
                        excellence. We live out this calling by being “Anxiously
                        Engaged,” rolling up our sleeves in every project, and
                        honoring each client’s vision as our own.
                      </p>

                      <p>
                        Today, Ladon is more than just a contractor. We’re the
                        trusted partner behind homes where first steps happen,
                        schools where futures begin, shops where dreams open
                        doors, and community spaces that bring people together.
                        Rain or shine, our team delivers quality, safety, and
                        sustainable building practices—because when you build
                        with heart, you build to last.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="vertical-element mt-md-5 py-md-5 aos-init aos-animate"
              data-aos="fade-up"
            >
              <div className="container">
                <div className="row d-flex align-items-center">
                  <div className="col-md-7">
                    <div className="section-element ps-0 p-5">
                      <div className="section-header text-uppercase mb-4">
                        <h2 className="left-pattern">Our Services</h2>
                        <h3>Choose us for best services</h3>
                      </div>
                      <p>
                        <strong className="fw-bold">
                          Why Choose Ladon Construction?{" "}
                          <em>We build with heart, not just hammers.</em>
                        </strong>
                      </p>
                      <p>
                        Choosing Ladon means more than hiring a contractor—it’s
                        partnering with a team that listens, shows up, and
                        treats your project like it truly matters. Because it
                        does.
                      </p>
                      <p>
                        From family homes to storefronts and community spaces,
                        we bring craftsmanship, care, and commitment to every
                        nail and detail. No shortcuts. No guesswork. Just honest
                        work, clear communication, and a crew that’s with you
                        from start to finish.
                      </p>
                      <p>Let’s build something that lasts—together.</p>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="image-holder text-right">
                      <img
                        src="/assets/images/post-item2.jpg"
                        alt="about-us"
                        className="img-fluid"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section> */}
          {loading ? (
            <p>Loading projects...</p>
          ) : (
            <ProjectsGrid
              projects={projects}
              onProjectClick={(project) => {
                navigate(`/projects/${project.slug}`);
              }}
            />
          )}
        </PageIntroBanner>
      </AppLayout>
    </div>
  );
};

export default ProjectsPage;
