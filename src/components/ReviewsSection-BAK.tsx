import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import styles from "../styles/_components/ReviewsSection.module.css";

const ReviewsSection = () => {
  const clientReviews = [
    {
      id: 1,
      project: "7eleven",
      review:
        "Ladon Construction Services delivered our retail site ahead of schedule with zero compromise on quality. Charles’s team was sharp, responsive, and deeply committed to our rollout goals.",
      author: "Marissa Tan, Regional Ops Manager",
      source: "LinkedIn",
    },
    {
      id: 2,
      project: "north-camella",
      review:
        "Mula paghahanda ng site hanggang turnover, maayos at malinaw ang proseso ng Ladon. Matibay ang pagkakagawa, at nirerespeto nila ang bawat detalye ng plano namin.",
      author: "Julius Camarines, Project Director",
      source: "Facebook",
    },
    {
      id: 3,
      project: "gmc",
      review:
        "Charles brought clarity to a chaotic build. Ladon turned our fragmented specs into a cohesive, well-managed construction timeline — with real accountability at every stage.",
      author: "Rico Mendoza, IT Lead",
      source: "Google Reviews",
    },
    {
      id: 4,
      project: "tadeco",
      review:
        "Kailangan namin ng kontratistang marunong gumalang sa tradisyon habang nagdadala ng makabagong solusyon. Ladon ang sagot — maingat, eksakto, at may malasakit.",
      author: "Ana Tadeo, Executive Assistant to the CEO",
      source: "Facebook",
    },
    {
      id: 5,
      project: "cjclds",
      review:
        "The chapel renovation was handled with reverence and care. Ladon balanced structural integrity with aesthetic sensitivity — a rare combination in construction.",
      author: "Elder Joseph, Communications Coordinator",
      source: "Instagram",
    },
    {
      id: 6,
      project: "um",
      review:
        "Ang among bagong IT building, klaro nga buhat sa mga tawo nga kabalo sa ilang trabaho. Salamat sa Ladon — paspas, limpyo, ug lig-on ang resulta.",
      author: "Dr. Liza Uy, Dean of IT",
      source: "Google Reviews",
    },
    {
      id: 7,
      project: "wakoh",
      review:
        "We came in with scattered requirements and shifting timelines. Charles helped us prioritize, phase the build, and deliver a facility that’s both functional and brand-aligned.",
      author: "Kenji Wakoh, Operations Director",
      source: "LinkedIn",
    },
    {
      id: 8,
      project: "mang-inasal",
      review: "Solid. Walang abala.",
      author: "Jessa Cruz, Franchise Manager",
      source: "Facebook",
    },
    {
      id: 9,
      project: "verdon-parc",
      review:
        "Ladon understood our vision for a premium residential experience. Charles’s team executed with polish, from structural framing to façade detailing. The results speak for themselves.",
      author: "Marco Verdon, Marketing Lead",
      source: "Instagram",
    },
    {
      id: 10,
      project: "davao-tech-park",
      review:
        "Ladon handled our tech park’s site development with military-grade precision. Drainage, grading, and access roads were all delivered ahead of schedule — no excuses, just results.",
      author: "Engr. Paolo Reyes, Site Development Lead",
      source: "LinkedIn",
    },
    {
      id: 11,
      project: "san-pedro-hospital",
      review:
        "Hospital construction demands discipline and zero tolerance for error. Charles’s team worked seamlessly with our engineers and delivered a facility that meets both DOH and patient standards.",
      author: "Dr. Nina Soriano, Facilities Director",
      source: "Google Reviews",
    },
    {
      id: 12,
      project: "agro-industrial-complex",
      review:
        "We needed a contractor who could handle scale, logistics, and rural terrain. Ladon didn’t flinch. Their crew adapted fast, built smart, and kept our agri ops running throughout.",
      author: "Miguel de la Peña, Operations Manager",
      source: "Facebook",
    },
    {
      id: 13,
      project: "city-hall-annex",
      review:
        "Public sector builds are tough — compliance, politics, and deadlines. Ladon navigated all three with professionalism and grit. The annex is now a benchmark for future LGU projects.",
      author: "Atty. Grace Llamas, City Architect",
      source: "LinkedIn",
    },
    {
      id: 14,
      project: "charles-residence",
      review:
        "Even on his own home, Charles didn’t cut corners. The build is a masterclass in proportion, material choice, and quiet elegance. Ladon’s craftsmanship speaks volumes.",
      author: "Arch. Benjie Cruz, Design Consultant",
      source: "Instagram",
    },
  ];

  return (
    <section
      id="testimonials"
      className="padding-large jarallax"
      style={{
        backgroundImage: "url('assets/images/bg-image2.jpg')",
        width: "100%",
        height: "808px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div
        className="container mt-5"
        data-aos="fade-up"
        data-aos-duration="2000"
      >
        <div className="row">
          <div className="section-header mb-5 text-uppercase">
            <h2 className={`left-pattern ${styles.light}`}>Testimonials</h2>
            <h3 className={styles.light}>What our clients say</h3>
          </div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            navigation
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
            keyboard={{ enabled: true }}
            effect="fade"
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              //1440: { slidesPerView: 4 },
            }}
            className="review-swiper"
          >
            {clientReviews.map(({ id, review, author }) => (
              <SwiperSlide key={id}>
                <figure className="review-item bg-light p-5">
                  <blockquote className="fs-5">"{review}"</blockquote>
                  <figcaption className="author-detail left-pattern">
                    <div className="name fw-bold">{author}</div>
                  </figcaption>
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
