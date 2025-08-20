import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useScrollNav } from "@/hooks/use-scroll-nav";
import SocialIcons from "./SocialIcons";
import "@/styles/_components/_hamburger.css";
import styles from "@/styles/_components/Header.module.css";
import { useTogglerVisible } from "./ui/useTogglerVisible";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isScrolled = useScrollNav();

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  const isTogglerVisible = useTogglerVisible();

  return (
    <header id="header" className={`${styles["site-header"]} unselectable`}>
      <nav
        className={`navbar navbar-expand-lg p-1 container-fluid ${
          isTogglerVisible && isScrolled ? "" : "position-fixed"
        } ${
          isScrolled ? styles["bg-navbar-scrolled"] : styles["bg-navbar-def"]
        }`}
      >
        <div className="container-lg mt-2 mb-2">
          <Link
            className={styles["navbar-brand"]}
            to="/"
          >
            <img
              src="/assets/images/lcs-banner.png"
              className={styles['navbar-brand-logo']}
              alt="LadonCo Header Logo"
              draggable={false}
            />
          </Link>

          {/* Hamburger */}
          <button
            className={`navbar-toggler ${styles["navbar-toggler"]}`}
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
            aria-controls="mainNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span
              className={`navbar-toggler-icon ${styles["navbar-toggler-icon"]}`}
            ></span>
          </button>

          <div
            className={`offcanvas offcanvas-end ${isMenuOpen ? "show" : ""}`}
            tabIndex={-1}
          >
            <div className="offcanvas-header px-4 pb-0">
              <button
                type="button"
                className="btn-close btn-close-black"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul
                className="navbar-nav text-uppercase justify-content-lg-center justify-content-md-end align-items-center flex-grow-1"
                style={isMenuOpen ? { fontSize: "2em" } : undefined}
              >
                <li className="nav-item me-5">
                  <Link
                    className={`nav-link ${
                      isMenuOpen ? "" : styles["nav-link-light"]
                    } text-uppercase p-0`}
                    to="/"
                    onClick={handleNavClick}
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item me-5">
                  <Link
                    className={`nav-link ${
                      isMenuOpen ? "" : styles["nav-link-light"]
                    } text-uppercase p-0`}
                    to="/#about"
                    onClick={handleNavClick}
                  >
                    About
                  </Link>
                </li>
                <li className="nav-item me-5">
                  <Link
                    className={`nav-link ${
                      isMenuOpen ? "" : styles["nav-link-light"]
                    } text-uppercase p-0`}
                    to="/#projects"
                    onClick={handleNavClick}
                  >
                    Projects
                  </Link>
                </li>
                <li className="nav-item me-5">
                  <Link
                    className={`nav-link ${
                      isMenuOpen ? "" : styles["nav-link-light"]
                    } text-uppercase p-0`}
                    to="/#services"
                    onClick={handleNavClick}
                  >
                    Services
                  </Link>
                </li>
                <li className="nav-item me-5">
                  <Link
                    className={`nav-link ${
                      isMenuOpen ? "" : styles["nav-link-light"]
                    } text-uppercase p-0`}
                    to="/blogs"
                    onClick={handleNavClick}
                  >
                    Blogs
                  </Link>
                </li>
                <li className="nav-item me-5">
                  <Link
                    className={`nav-link ${
                      isMenuOpen ? "" : styles["nav-link-light"]
                    } text-uppercase p-0`}
                    to="/contact"
                    onClick={handleNavClick}
                  >
                    Contact
                  </Link>
                </li>
                {/* Add social icons to mobile menu */}
                <li className="nav-item mt-4 d-lg-none">
                  <div className="d-flex justify-content-center">
                    <SocialIcons iconColor="black" size={24} />
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="d-none d-lg-flex align-items-center ms-auto">
            <SocialIcons
              className="header-social-icons"
              iconColor={
                isScrolled ? "var(--primary-color)" : "var(--light-color)"
              }
              size={20}
            />
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Header;
