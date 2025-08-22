import React, { ReactNode } from "react";

interface PageWrapperProps {
  backgroundImageUrl: string;
  title: string;
  pageName: ReactNode;
  children?: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({
  backgroundImageUrl,
  title,
  pageName,
  children,
}) => {
  return (
    <>
      <section
        id="intro"
        style={{
          background: `url(${backgroundImageUrl})`,
          backgroundImage: `linear-gradient(rgba(8, 37, 83, 0.97), rgba(94, 98, 145, 0.47)), url("${backgroundImageUrl}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "grayscale(1)",
        }}
      >
        <div className="container pt-5" data-aos="fade-up">
          <div className="row py-5">
            {/* <div className="banner-content my-5 py-5">*/}
            <div className="banner-content mt-5 pt-5">
              {" "}
              <h1 className="banner-title light text-uppercase fw-bold">
                {title}
              </h1>
              <nav className="breadcrumb mt-3">
                <a className="breadcrumb-item text-white" href="/">
                  Home
                </a>
                <span
                  className="breadcrumb-item active text-white"
                  aria-current="page"
                >
                  / {pageName}
                </span>
              </nav>
            </div>
          </div>
        </div>
      </section>

      {children}
    </>
  );
};

export default PageWrapper;
