import { useIsotope } from "@/hooks/use-isotope";

const Projects = () => {
  const { containerRef, activeFilter, handleFilterClick } = useIsotope();

  return (
    <section id="projects" className="padding-large">
      <div className="container-fluid">
        <div className="section-header offset-lg-4">
          <h2 className="text-uppercase mb-3 left-pattern">Our Projects</h2>
          <h3 className="text-uppercase">Explore our works</h3>
        </div>
        <div className="projects-isotope">
          <div className="projects-flters d-flex flex-wrap justify-content-center my-5">
            <button
              className={`filter-button border-0 bg-transparent me-5 mb-3 ${
                activeFilter === "*" ? "active" : ""
              }`}
              onClick={() => handleFilterClick("*")}
            >
              All
            </button>
            <button
              className={`filter-button border-0 bg-transparent me-5 mb-3 ${
                activeFilter === ".building" ? "active" : ""
              }`}
              onClick={() => handleFilterClick(".building")}
            >
              Buildings
            </button>
            <button
              className={`filter-button border-0 bg-transparent me-5 mb-3 ${
                activeFilter === ".interior" ? "active" : ""
              }`}
              onClick={() => handleFilterClick(".interior")}
            >
              Interior & Exterior
            </button>
            <button
              className={`filter-button border-0 bg-transparent me-5 mb-3 ${
                activeFilter === ".renovate" ? "active" : ""
              }`}
              onClick={() => handleFilterClick(".renovate")}
            >
              Renovate
            </button>
            <button
              className={`filter-button border-0 bg-transparent me-5 mb-3 ${
                activeFilter === ".industry" ? "active" : ""
              }`}
              onClick={() => handleFilterClick(".industry")}
            >
              Industry
            </button>
            <button
              className={`filter-button border-0 bg-transparent me-5 mb-3 ${
                activeFilter === ".road" ? "active" : ""
              }`}
              onClick={() => handleFilterClick(".road")}
            >
              Road
            </button>
          </div>
          <div className="row isotope-container" ref={containerRef}>
            <div className="col-lg-4 col-md-6 item building">
              <div className="projects-content mx-auto">
                <a href="assets/images/project-single">
                  <img
                    src="assets/images/projects-item1.jpg"
                    className="reveal-curve-top"
                    alt="building"
                  />
                </a>
              </div>
              <h3 className="fs-3 text-uppercase text-center mt-3 mb-5">
                <a href="/project-single">Outbox creatives building</a>
              </h3>
            </div>

            <div className="col-lg-4 col-md-6 item building">
              <div className="projects-content mx-auto">
                <a href="assets/images/project-single">
                  <img
                    src="assets/images/projects-item2.jpg"
                    className="reveal-curve-top"
                    alt="building"
                  />
                </a>
              </div>
              <h3 className="fs-3 text-uppercase text-center mt-3 mb-5">
                <a href="/project-single">Outbox creatives building</a>
              </h3>
            </div>

            <div className="col-lg-4 col-md-6 item building">
              <div className="projects-content mx-auto">
                <a href="assets/images/project-single">
                  <img
                    src="assets/images/projects-item3.jpg"
                    className="reveal-curve-top"
                    alt="building"
                  />
                </a>
              </div>
              <h3 className="fs-3 text-uppercase text-center mt-3 mb-5">
                <a href="/project-single">Outbox creatives building</a>
              </h3>
            </div>

            <div className="col-lg-4 col-md-6 item building">
              <div className="projects-content mx-auto">
                <a href="assets/images/project-single">
                  <img
                    src="assets/images/projects-item4.jpg"
                    className="reveal-curve-top"
                    alt="building"
                  />
                </a>
              </div>
              <h3 className="fs-3 text-uppercase text-center mt-3 mb-5">
                <a href="/project-single">Outbox creatives building</a>
              </h3>
            </div>

            <div className="col-lg-4 col-md-6 item building">
              <div className="projects-content mx-auto">
                <a href="assets/images/project-single">
                  <img
                    src="assets/images/projects-item5.jpg"
                    className="reveal-curve-top"
                    alt="building"
                  />
                </a>
              </div>
              <h3 className="fs-3 text-uppercase text-center mt-3 mb-5">
                <a href="/project-single">Outbox creatives building</a>
              </h3>
            </div>

            <div className="col-lg-4 col-md-6 item building">
              <div className="projects-content mx-auto">
                <a href="assets/images/project-single">
                  <img
                    src="assets/images/projects-item6.jpg"
                    className="reveal-curve-top"
                    alt="building"
                  />
                </a>
              </div>
              <h3 className="fs-3 text-uppercase text-center mt-3 mb-5">
                <a href="/project-single">Outbox creatives building</a>
              </h3>
            </div>

            <div className="col-lg-4 col-md-6 item building">
              <div className="projects-content mx-auto">
                <a href="assets/images/project-single">
                  <img
                    src="assets/images/projects-item7.jpg"
                    className="reveal-curve-top"
                    alt="building"
                  />
                </a>
              </div>
              <h3 className="fs-3 text-uppercase text-center mt-3 mb-5">
                <a href="/project-single">Outbox creatives building</a>
              </h3>
            </div>

            <div className="col-lg-4 col-md-6 item building">
              <div className="projects-content mx-auto">
                <a href="assets/images/project-single">
                  <img
                    src="assets/images/projects-item8.jpg"
                    className="reveal-curve-top"
                    alt="building"
                  />
                </a>
              </div>
              <h3 className="fs-3 text-uppercase text-center mt-3 mb-5">
                <a href="/project-single">Outbox creatives building</a>
              </h3>
            </div>

            <div className="col-lg-4 col-md-6 item building">
              <div className="projects-content mx-auto">
                <a href="assets/images/project-single">
                  <img
                    src="assets/images/projects-item9.jpg"
                    className="reveal-curve-top"
                    alt="building"
                  />
                </a>
              </div>
              <h3 className="fs-3 text-uppercase text-center mt-3 mb-5">
                <a href="/project-single">Outbox creatives building</a>
              </h3>
            </div>

            <div className="col-lg-4 col-md-6 item interior">
              <div className="projects-content mx-auto">
                <a href="assets/images/project-single">
                  <img
                    src="assets/images/projects-item10.jpg"
                    className="reveal-curve-top"
                    alt="interior"
                  />
                </a>
              </div>
              <h3 className="fs-3 text-uppercase text-center mt-3 mb-5">
                <a href="/project-single">Outbox creatives interior</a>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
