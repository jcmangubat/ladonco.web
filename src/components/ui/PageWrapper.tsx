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
          backgroundImage: `linear-gradient(rgba(8, 37, 83, 0.97), rgba(94, 98, 145, 0.47)), url("${backgroundImageUrl}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "65vh",
        }}
      >
        <div className="container h-100">
          <div
            className="row h-100 align-items-center justify-content-center"
            data-aos="fade-up"
          >
            <div className="mt-5 pt-3 col-auto justify-left banner-content">
              <h1 className="unselectable banner-title light text-uppercase fw-bold">
                {title}
              </h1>
              <nav className="breadcrumb mt-3 unselectable">
                <a className="breadcrumb-item text-white" href="/">
                  Home
                </a>
                <span
                  className="breadcrumb-item active text-white"
                  aria-current="page"
                >
                  {pageName}
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
