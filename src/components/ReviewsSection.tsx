import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-cards";
import styles from "../styles/_components/ReviewsSection.module.css";
import { useState, useEffect } from "react";

const ReviewsSection = () => {
  const clientReviews = [
    {
      id: 1,
      project: "7eleven",
      projectName: "7-Eleven Retail Site",
      review:
        "Ladon Construction Services delivered our retail site ahead of schedule with zero compromise on quality. Charles's team was sharp, responsive, and deeply committed to our rollout goals.",
      author: "Marissa Tan",
      position: "Regional Ops Manager",
      source: "LinkedIn",
      rating: 5,
      date: "June 2023",
    },
    {
      id: 2,
      project: "north-camella",
      projectName: "North Camella Development",
      review:
        "Mula paghahanda ng site hanggang turnover, maayos at malinaw ang proseso ng Ladon. Matibay ang pagkakagawa, at nirerespeto nila ang bawat detalye ng plano namin.",
      author: "Julius Camarines",
      position: "Project Director",
      source: "Facebook",
      rating: 5,
      date: "April 2023",
    },
    {
      id: 3,
      project: "gmc",
      projectName: "GMC Corporate Office",
      review:
        "Charles brought clarity to a chaotic build. Ladon turned our fragmented specs into a cohesive, well-managed construction timeline — with real accountability at every stage.",
      author: "Rico Mendoza",
      position: "IT Lead",
      source: "Google Reviews",
      rating: 4,
      date: "March 2023",
    },
    {
      id: 4,
      project: "tadeco",
      projectName: "Tadeco Heritage Site",
      review:
        "Kailangan namin ng kontratistang marunong gumalang sa tradisyon habang nagdadala ng makabagong solusyon. Ladon ang sagot — maingat, eksakto, at may malasakit.",
      author: "Ana Tadeo",
      position: "Executive Assistant to the CEO",
      source: "Facebook",
      rating: 5,
      date: "February 2023",
    },
    {
      id: 5,
      project: "cjclds",
      projectName: "CJC LDS Chapel",
      review:
        "The chapel renovation was handled with reverence and care. Ladon balanced structural integrity with aesthetic sensitivity — a rare combination in construction.",
      author: "Elder Joseph",
      position: "Communications Coordinator",
      source: "Instagram",
      rating: 5,
      date: "January 2023",
    },
    {
      id: 6,
      project: "um",
      projectName: "University IT Building",
      review:
        "Ang among bagong IT building, klaro nga buhat sa mga tawo nga kabalo sa ilang trabaho. Salamat sa Ladon — paspas, limpyo, ug lig-on ang resulta.",
      author: "Dr. Liza Uy",
      position: "Dean of IT",
      source: "Google Reviews",
      rating: 5,
      date: "December 2022",
    },
    {
      id: 7,
      project: "wakoh",
      projectName: "Wakoh Corporate Facility",
      review:
        "We came in with scattered requirements and shifting timelines. Charles helped us prioritize, phase the build, and deliver a facility that's both functional and brand-aligned.",
      author: "Kenji Wakoh",
      position: "Operations Director",
      source: "LinkedIn",
      rating: 4,
      date: "November 2022",
    },
    {
      id: 8,
      project: "mang-inasal",
      projectName: "Mang Inasal Branch",
      review: "Solid. Walang abala.",
      author: "Jessa Cruz",
      position: "Franchise Manager",
      source: "Facebook",
      rating: 5,
      date: "October 2022",
    },
    {
      id: 9,
      project: "verdon-parc",
      projectName: "Verdon Parc Residences",
      review:
        "Ladon understood our vision for a premium residential experience. Charles's team executed with polish, from structural framing to façade detailing. The results speak for themselves.",
      author: "Marco Verdon",
      position: "Marketing Lead",
      source: "Instagram",
      rating: 5,
      date: "September 2022",
    },
    {
      id: 10,
      project: "davao-tech-park",
      projectName: "Davao Tech Park",
      review:
        "Ladon handled our tech park's site development with military-grade precision. Drainage, grading, and access roads were all delivered ahead of schedule — no excuses, just results.",
      author: "Engr. Paolo Reyes",
      position: "Site Development Lead",
      source: "LinkedIn",
      rating: 5,
      date: "August 2022",
    },
    {
      id: 11,
      project: "san-pedro-hospital",
      projectName: "San Pedro Hospital",
      review:
        "Hospital construction demands discipline and zero tolerance for error. Charles's team worked seamlessly with our engineers and delivered a facility that meets both DOH and patient standards.",
      author: "Dr. Nina Soriano",
      position: "Facilities Director",
      source: "Google Reviews",
      rating: 5,
      date: "July 2022",
    },
    {
      id: 12,
      project: "agro-industrial-complex",
      projectName: "Agro Industrial Complex",
      review:
        "We needed a contractor who could handle scale, logistics, and rural terrain. Ladon didn't flinch. Their crew adapted fast, built smart, and kept our agri ops running throughout.",
      author: "Miguel de la Peña",
      position: "Operations Manager",
      source: "Facebook",
      rating: 4,
      date: "June 2022",
    },
    {
      id: 13,
      project: "city-hall-annex",
      projectName: "City Hall Annex",
      review:
        "Public sector builds are tough — compliance, politics, and deadlines. Ladon navigated all three with professionalism and grit. The annex is now a benchmark for future LGU projects.",
      author: "Atty. Grace Llamas",
      position: "City Architect",
      source: "LinkedIn",
      rating: 5,
      date: "May 2022",
    },
    {
      id: 14,
      project: "charles-residence",
      projectName: "Charles Residence",
      review:
        "Even on his own home, Charles didn't cut corners. The build is a masterclass in proportion, material choice, and quiet elegance. Ladon's craftsmanship speaks volumes.",
      author: "Arch. Benjie Cruz",
      position: "Design Consultant",
      source: "Instagram",
      rating: 5,
      date: "April 2022",
    },
  ];

  // Function to render star rating
  const renderRating = (rating) => {
    return (
      <div className="rating">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < rating ? "star filled" : "star"}>
            ★
          </span>
        ))}
      </div>
    );
  };

  // Function to get source icon
  const getSourceIcon = (source) => {
    switch (source.toLowerCase()) {
      case "linkedin":
        return "👔";
      case "facebook":
        return "📘";
      case "google reviews":
        return "🔍";
      case "instagram":
        return "📸";
      default:
        return "💬";
    }
  };

  return (
    <section
      id="testimonials"
      className={`${styles.testimonials} padding-small jarallax position-relative overflow-hidden`}
      style={{
        backgroundImage: "url('assets/images/bg-image2.jpg')",
        width: "100%",
        height: "auto",
        minHeight: "808px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {/* for better text readability */}
      {/* <div className={styles.overlay}></div> */}

      <div
        className="container position-relative z-10 mt-5"
        data-aos="fade-up"
        data-aos-duration="2000"
      >
        <div className="row">
          <div
            className="section-header offset-lg-4"
            style={
              {
                textShadow: "rgb(0, 0, 0) 1px 1px 2px",
              }
            }
          >
            <h2 className={`${styles.light} text-uppercase mb-3 left-pattern`}>
              Client Reviews
            </h2>
            <h3 className={`${styles.light} text-uppercase`}>
              What our clients say
            </h3>
          </div>

          {/* <div className="text-center">
            <div className="section-header mb-5 text-uppercase">
              <h2 className={`${styles.light}`}>Testimonials</h2>
              <h3 className={styles.light}>What our clients say</h3>
            </div>
            <div className={`${styles.underline} mx-auto`}></div>
          </div> */}

          {/* <div className="section-header mb-5 text-uppercase text-center">
            <h2 className={`left-pattern ${styles.light}`}>Testimonials</h2>
            <h3 className={styles.light}>What our clients say</h3>
            <div className={`${styles.underline} mx-auto`}></div>
          </div> */}

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={10}
            slidesOffsetBefore={0} // space before first card
            slidesOffsetAfter={0} // space after last card
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            keyboard={{ enabled: true }}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1440: { slidesPerView: 4 },
            }}
            className="review-swiper py-5"
          >
            {clientReviews.map((review) => (
              <SwiperSlide key={review.id}>
                <div className={`${styles.reviewCard} h-100`}>
                  {/* Card Header with Project Info */}
                  <div className={styles.cardHeader}>
                    <div className={styles.projectInfo}>
                      <span className={styles.projectIcon}>🏗️</span>
                      <div>
                        <h4 className={styles.projectName}>
                          {review.projectName}
                        </h4>
                        <span className={styles.reviewDate}>{review.date}</span>
                      </div>
                    </div>
                    <div className={styles.verifiedBadge}>
                      <span>✓</span> Verified
                    </div>
                  </div>

                  {/* Rating */}
                  <div className={styles.ratingContainer}>
                    {renderRating(review.rating)}
                  </div>

                  {/* Review Content */}
                  <div className={styles.reviewContent}>
                    <blockquote className={styles.reviewText}>
                      "{review.review}"
                    </blockquote>
                  </div>

                  {/* Author Info */}
                  <div className={styles.authorInfo}>
                    <div className={styles.authorAvatar}>
                      {review.author.charAt(0)}
                    </div>
                    <div className={styles.authorDetails}>
                      <div className={styles.authorName}>{review.author}</div>
                      <div className={styles.authorPosition}>
                        {review.position}
                      </div>
                    </div>
                    <div className={styles.sourceInfo}>
                      <span className={styles.sourceIcon}>
                        {getSourceIcon(review.source)}
                      </span>
                      <span className={styles.sourceText}>{review.source}</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
