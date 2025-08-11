import React from "react";

interface PageIntroBannerProps {
  backgroundImageUrl: string;
  title: string;
  pageName: string;
  children?: React.ReactNode;
}

const PageIntroBanner: React.FC<PageIntroBannerProps> = ({
  backgroundImageUrl,
  title,
  pageName,
  children
}) => {
  return (
    <>
      <section
        id="intro"
        style={{
          background: `url(${backgroundImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "grayscale(1)",
        }}
      >
        <div className="container pt-5" data-aos="fade-up">
          <div className="row py-5">
            <div className="banner-content my-5 py-5">
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

export default PageIntroBanner;
