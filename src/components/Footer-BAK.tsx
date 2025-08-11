import React from "react";
import SocialIcons from "./SocialIcons";

const Footer = () => {
  return (
    <footer id="footer" className="overflow-hidden">
      <div className="container mt-5">
        <div className="row d-flex flex-wrap justify-content-between">
          <div className="col-lg-3 col-md-6 col-sm-6 pb-3">
            <div className="footer-menu">
              <img
                src="/assets/images/main-logo.png"
                className="logo"
                alt="LadonCo Footer Logo"
                style={{
                  width: "160px",
                  height: "47px",
                  objectFit: "contain",
                  zIndex: 9,
                  marginBottom: "15px",
                }}
              />
              <p className="mt-2 text-muted">Vehicula et tempus — motion and time, shaped by Ladon.</p>
            </div>
          </div>
          <div className="col-lg-2 col-md-6 col-sm-6 pb-3">
            <div className="footer-menu">
              <ul className="menu-list list-unstyled">
                <li className="pb-2">
                  <a href="#about">About</a>
                </li>
                <li className="pb-2">
                  <a href="#">Terms & Conditions</a>
                </li>
                <li className="pb-2">
                  <a href="#">Privacy Policy</a>
                </li>
                <li className="pb-2">
                  <a href="#">Career</a>
                </li>
                <li className="pb-2">
                  <a href="#">Contact</a>
                </li>
                <li className="pb-2">
                  <a href="#">Help</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 pb-3">
            <div className="footer-menu">
              <ul className="menu-list list-unstyled">
                <li className="pb-2">
                  <a href="#about">Quick Links</a>
                </li>
                <li className="pb-2">
                  <a href="#">Newsletter</a>
                </li>
                <li className="pb-2">
                  <a href="#">Articles</a>
                </li>
                <li className="pb-2">
                  <a href="#">Location</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 pb-3">
            <div className="footer-menu">
              <ul className="menu-list list-unstyled">
                <li className="pb-2">
                  Purok 8B Tiera Nueva Brgy. Tacunan, Davao City, Philippines
                  8000
                </li>
                <li className="pb-2">+63 (82) 308 0715</li>
                <li className="pb-2">+63 (995) 122 5449</li>
                <li className="pb-2">
                  <a href="mailto:contactus@ladonco.ph">contactus@ladonco.ph</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom d-flex flex-wrap justify-content-between border-top pt-3">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <p>©2025 Ladon Construction | All rights reserved</p>
            </div>
            <div className="col-lg-6">
              <SocialIcons iconColor="var(--primary-color)" size={24} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

