import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { jarallax } from "jarallax";
import { getServiceOfferings } from "@/data/service-offerings";
import styles from "../styles/_components/ServicesSection.module.css";

const ServicesSection = () => {
  const topGroups = getServiceOfferings(1, 2, 3);
  const bottomGroups = getServiceOfferings(4, 5);

  const renderGroup = (group, index) => (
    <div key={index} className="col-lg-4 col-md-6 mb-5">
      <div
        className="p-4 rounded shadow-sm h-100"
        style={{
          background: `linear-gradient(to right bottom, rgba(78, 74, 104, 0.85), rgba(50, 50, 50, 0.85))`,
          borderLeft: `4px solid ${group.accent}`,
        }}
      >
        <img
          src={`/assets/images/services/${group.title
            .toLowerCase()
            .replace(/ & | /g, "-")}.png`}
          alt={group.title}
          className="img-fluid rounded mb-3 unselectable"
          style={{
            maxHeight: "180px",
            objectFit: "cover",
            width: "100%",
            boxShadow: "0 0 10px rgba(0,0,0,0.4)",
          }}
          draggable={false}
        />
        <h3
          className="fs-4 text-uppercase mb-3"
          style={{
            color: group.accent,
            textShadow: "1px 1px 2px #000",
          }}
        >
          {group.icon} {group.title}
        </h3>
        <ul className="list-unstyled" style={{ color: "#f0f0f0" }}>
          {group.services.map((service, i) => (
            <li
              key={i}
              className="mb-2"
              style={{ display: "flex", alignItems: "center" }}
            >
              <span style={{ color: group.accent, marginRight: "8px" }}>▹</span>

              {(() => {
                const slug = service.toLowerCase().replace(/ & | /g, "-");
                const srvcGrp = group.title
                  .toLowerCase()
                  .replace(/ & | /g, "-");

                return (
                  <Link
                    id="service-link"
                    to={`/servicedetails/${srvcGrp}/${slug}`}
                    className="text-decoration-none"
                    style={{ textShadow: "rgb(0, 0, 0) 1px 1px 2px" }}
                  >
                    {service}
                  </Link>
                );
              })()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  useEffect(() => {
    jarallax(document.querySelectorAll(".jarallax"), {
      speed: 0.5,
    });
  }, []);

  return (
    // <section
    //   id="services"
    //   className={`jarallax py-5 ${styles["services-section"]}`}
    // >
    <section
      id="services"
      className={`jarallax py-5 ${styles["services-section"]}`}
      data-jarallax
      data-speed="0.5"
    >
      <img
        className="jarallax-img"
        src="/assets/images/intro/bg-image4.jpg"
        alt=""
      />
      <div
        className={styles["services-section-overlay"]}
        style={{
          backgroundImage:
            "linear-gradient(rgba(18, 77, 170, 0.6), rgb(54, 57, 87))",
          zIndex: 1,
        }}
      ></div>
      <div className="container" style={{ zIndex: 2, position: "inherit" }}>
        <div className="col-lg-6">
          <div
            className="section-header"
            style={{
              color: "rgb(255,255, 255)",
              textShadow: "rgb(0, 0, 0) 1px 1px 2px",
            }}
          >
            <h2 className="text-uppercase mb-3 left-pattern">
              Our Service Offerings
            </h2>
            <h3 className="text-uppercase">
              Every project is a trust exercise.
            </h3>
          </div>
        </div>

        <div
          className="col-lg-6 mb-5"
          style={{
            color: "whitesmoke",
            textShadow: "rgb(0, 0, 0) 1px 1px 2px",
          }}
        >
          <p>
            That’s why each service we offer is designed to be modular,
            transparent, and tailored to what matters most—your timeline, your
            budget, and your peace of mind.
          </p>
        </div>

        <div className="row justify-content-center">
          {topGroups.map(renderGroup)}
        </div>
        <div className="row justify-content-center">
          {bottomGroups.map(renderGroup)}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
