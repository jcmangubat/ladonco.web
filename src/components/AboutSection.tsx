import { fdatasync } from "fs";
import styles from "../styles/_components/AboutSection.module.css";

const AboutSection = () => {
  return (
    <section id="about" className="padding-medium bg-gray-200">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="section-header">
              <h2 className="text-uppercase mb-3 left-pattern">About Us</h2>
              <h3 className="text-uppercase">
                We’re more than a company. Here’s our story.
              </h3>
              <img
                src="/images/ladonco-spirit.png"
                alt="LadonCo Spirit"
                className="img-fluid w-100 mb-4 unselectable"
                draggable={false}
              />
            </div>
          </div>

          <div className={`${styles["pt-desktop-8"]} col-lg-6`}>
            <p>
              <strong className="pb-2 d-block">
                At Ladon Construction Services, we are more than just a
                construction company. We are a partner in building your future.
              </strong>
              We don’t just build structures. We build trust. We build long-term
              partnerships.
            </p>
            <p>
              Modest beginnings. A team known for precision, transparency, care.
            </p>
            <p>
              Homes. Commercial spaces. Public facilities. Each project reflects
              clarity, integrity, respect.
            </p>
            <p>
              Whether you’re starting a new project or upgrading an existing
              structure, we offer reliable, quality construction solutions that
              last.
            </p>
            <p>
              Seasoned engineers. Local craftsmen. Safe, lasting spaces. Honest
              timelines. Clear contracts.
            </p>

            <a
              href="/about"
              className="btn-slide btn-medium btn-dark hover-slide-right text-uppercase mt-5"
            >
              <span>More About Us ...</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
