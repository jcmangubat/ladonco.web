import React from "react";
import styles from "@/styles/_components/Intro.module.css";

const heroImages = [
  "lcs-banner-02.jpg",
  "lcs-banner-06.jpg",
  "lcs-banner-07.jpg",
  "lcs-banner-08.jpg",
  "lcs-banner-09.jpg",
  "lcs-banner-12.jpg",
  "lcs-banner-13.jpg",
  "lcs-banner-15.jpg",
  "lcs-banner-16.png",
  "lcs-banner-17.jpg",
  "lcs-banner-22.jpg",
  "lcs-banner-27.jpg",
  "lcs-banner-31.jpg",
];

const Intro = () => {
  return (
    <section
      id="intro"
      className={`position-relative overflow-hidden `}
      style={{ height: "100vh" }}
    >
      <div className="image-holder position-relative">
        <img
          src="/assets/images/hero/lcs-banner-09.jpg"
          alt="banner"
          className="banner-image w-100 h-200 object-fit-cover"
        />
      </div>

      <div
        className="position-absolute top-50 start-50 translate-middle w-100"
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        data-aos="fade-up"
        data-aos-delay="0"
        data-aos-duration="800"
      >
        <div className="banner-content text-center">
          <h1
            className={`${styles["banner-title"]} light text-uppercase fw-bold`}
            data-aos="fade-up"
            data-aos-delay="100"
          >
            "We can’t do everything. But what we do — we do superbly."
            <span className={styles["banner-title-half"]}>
              -- Charlemagne Reyes, <i>Founder</i>
            </span>
          </h1>
          <a
            href="#projects"
            className="btn-slide btn-medium btn-light hover-slide-right text-uppercase mt-5 d-inline-block"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <span>View our projects</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Intro;
