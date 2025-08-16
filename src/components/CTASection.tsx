import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AppLayout = () => {
  useEffect(() => {
    AOS.init({
      once: true, // Animates only once
      duration: 800, // Animation duration in ms
      easing: "ease-out", // Animation easing
    });
  }, []);

  return (
    <section
        id="contact"
        className="d-flex align-items-center"
        style={{
          backgroundImage: `url("/assets/images/intro/bg-image12.jpg")`,
          width: "100%",
          height: "567px",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
        }}
        // data-aos="fade-up"
        // data-aos-duration="2000"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 text-center">
              <h3 className="light text-uppercase">
                Are you ready to start a new project?
              </h3>
              <p className="light mt-4">
                If you have any projects in mind say hello at{" "}
                <strong>
                  <a href="mailto:contactus@ladonco.ph">contactus@ladonco.ph</a>
                </strong>{" "}
                or just call us at{" "}
                <strong>
                  <a href="tel:+639951225449">+63 (995) 122 5449</a>
                </strong>
                .
              </p>
              <a
                href="/contact"
                className="btn-slide btn-medium btn-light hover-slide-right text-uppercase mt-5"
                draggable={false}
              >
                <span>Get a Free Quote</span>
              </a>
            </div>
          </div>
        </div>
      </section>
  );
};

export default AppLayout;
