import React from "react";
import SocialIcons from "./SocialIcons";
import styles from "@/styles/_components/Footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className={`${styles.footer} overflow-hidden`}>
      {/* Top decorative wave */}
      {/* <div className={styles.waveTop}></div> */}

      <div className="container mt-5">
        <div className="row d-flex flex-wrap justify-content-between">
          {/* Company Info */}
          <div className="col-lg-3 col-md-6 col-sm-6 pb-3">
            <div className={styles.footerSection}>
              <img
                src="/assets/images/lcs-banner.png"
                className={`${styles.logo} unselectable`}
                draggable={false}
                alt="LadonCo Footer Logo"
              />
              <p className={styles.companyDescription}>
                Vehicula et tempus — motion and time, shaped by Ladon.
              </p>
              <div className={styles.certifications}>
                <span className={styles.certBadge}>ISO 9001</span>
                <span className={styles.certBadge}>PCAB Licensed</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 col-sm-6 pb-3">
            <div className={styles.footerSection}>
              <h4 className={styles.footerHeading}>Company</h4>
              <ul className={styles.menuList}>
                <li>
                  <a href="#about" className={styles.footerLink}>
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.footerLink}>
                    Our Team
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.footerLink}>
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.footerLink}>
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.footerLink}>
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Resources */}
          <div className="col-lg-3 col-md-6 col-sm-6 pb-3">
            <div className={styles.footerSection}>
              <h4 className={styles.footerHeading}>Resources</h4>
              <ul className={styles.menuList}>
                <li>
                  <a href="#" className={styles.footerLink}>
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.footerLink}>
                    Newsletter
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.footerLink}>
                    Case Studies
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.footerLink}>
                    Downloads
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.footerLink}>
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="col-lg-3 col-md-6 col-sm-6 pb-3">
            <div className={styles.footerSection}>
              <h4 className={styles.footerHeading}>Contact Us</h4>
              <ul className={styles.contactList}>
                <li className={styles.contactItem}>
                  {/* <span className={styles.contactIcon}>📍</span> */}
                  <span>
                    Purok 8B Tiera Nueva Brgy. Tacunan, Davao City, Philippines
                    8000
                  </span>
                </li>
                <li className={styles.contactItem}>
                  {/* <span className={styles.contactIcon}>📞</span> */}
                  <span>+63 (82) 308 0715</span>
                </li>
                <li className={styles.contactItem}>
                  {/* <span className={styles.contactIcon}>📱</span> */}
                  <span>+63 (995) 122 5449</span>
                </li>
                <li className={styles.contactItem}>
                  {/* <span className={styles.contactIcon}>✉️</span> */}
                  <a
                    href="mailto:contactus@ladonco.ph"
                    className={styles.footerLink}
                  >
                    contactus@ladonco.ph
                  </a>
                </li>
              </ul>

              {/* Newsletter Signup */}
              <div className={styles.newsletter}>
                <h5 className={styles.newsletterTitle}>
                  Subscribe to Newsletter
                </h5>
                <div className={styles.newsletterForm}>
                  <input
                    type="email"
                    placeholder="Your email"
                    className={styles.newsletterInput}
                  />
                  <button className={styles.newsletterButton}>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div
        className={`${styles.footerBottom} d-flex flex-wrap justify-content-between border-top pt-3`}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <p className={styles.copyright}>
                ©{currentYear} Ladon Construction | All rights reserved
              </p>
            </div>
            <div className="col-lg-6 text-lg-end">
              <div className={styles.socialContainer}>
                <SocialIcons iconColor="var(--primary-color)" size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decorative wave */}
      <div className={styles.waveBottom}></div>
    </footer>
  );
};

export default Footer;
