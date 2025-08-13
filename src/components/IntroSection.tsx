// Intro.tsx
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useState, useEffect, useRef } from "react";
import styles from "@/styles/_components/Intro.module.css";
import BannerTransition from "./ui/banner-transition";
import { url } from "inspector";
import frag from "@/shaders/glasswave.frag";
import vert from "@/shaders/glasswave.vert";

const headlines = [
  {
    id: 1,
    quote: "We can’t do everything. But what we do — we do superbly.",
    attribution: {
      name: "Charlemagne Reyes",
      title: "Founder",
    },
    caption: "25+ years of delivering structures that stand the test of time.",
    image: "lcs-banner-02.jpg",
  },
  {
    id: 2,
    quote: "We shape our buildings; thereafter they shape us.",
    attribution: {
      name: "Winston Churchill",
      title: "Statesman",
    },
    caption: "Design with purpose. Build with legacy.",
    image: "lcs-banner-06.jpg",
  },
  {
    id: 3,
    quote:
      "Architecture should speak of its time and place, but yearn for timelessness.",
    attribution: {
      name: "Frank Gehry",
      title: "Architect",
    },
    caption:
      "Every Ladon structure is built to endure—physically and emotionally.",
    image: "lcs-banner-31.jpg",
  },
  {
    id: 4,
    quote: "A building has integrity just like a man. And just as seldom.",
    attribution: {
      name: "Ayn Rand",
      title: "Author of *The Fountainhead*",
    },
    caption: "We don’t cut corners. We build with conviction.",
    image: "lcs-banner-08.jpg",
  },
  {
    id: 5,
    quote:
      "The mother of art is architecture. Without an architecture of our own we have no soul of our own civilization.",
    attribution: {
      name: "Frank Lloyd Wright",
      title: "Architect",
    },
    caption: "Ladon builds more than structures—we build cultural legacy.",
    image: "lcs-banner-09.jpg",
  },
  {
    id: 6,
    quote: "Rome wasn’t built in a day, but it was built to last.",
    attribution: {
      name: "Unknown",
      title: "Proverb",
    },
    caption: "We take our time—because permanence matters.",
    image: "lcs-banner-12.jpg",
  },
  {
    id: 7,
    quote: "Unless the Lord builds the house, the builders labor in vain.",
    attribution: {
      name: "Psalm 127:1",
      title: "Scripture",
    },
    caption: "We build with purpose, humility, and enduring faith.",
    image: "lcs-banner-13.png",
  },
  {
    id: 8,
    quote:
      "Good buildings come from good people, and all problems are solved by good design.",
    attribution: {
      name: "Stephen Gardiner",
      title: "Architect",
    },
    caption:
      "Behind every Ladon build is a team that listens, designs, and delivers.",
    image: "lcs-banner-15.jpg",
  },
  {
    id: 9,
    quote: "To create, one must first question everything.",
    attribution: {
      name: "Eileen Gray",
      title: "Designer & Architect",
    },
    caption: "We don’t just build—we rethink, refine, and elevate.",
    image: "lcs-banner-16.png",
  },
  {
    id: 10,
    quote: "Form ever follows function.",
    attribution: {
      name: "Louis Sullivan",
      title: "Architect",
    },
    caption:
      "Every Ladon structure is designed to serve with strength and clarity.",
    image: "lcs-banner-17.jpg",
  },
  {
    id: 11,
    quote:
      "The bitterness of poor quality remains long after the sweetness of low price is forgotten.",
    attribution: {
      name: "Benjamin Franklin",
      title: "Inventor & Statesman",
    },
    caption: "We build for longevity—not shortcuts.",
    image: "lcs-banner-22.jpg",
  },
  {
    id: 12,
    quote: "Each brick laid is a promise kept.",
    attribution: {
      name: "Charles Reyes",
      title: "Founder",
    },
    caption: "At Ladon, every detail reflects our commitment to trust.",
    image: "lcs-banner-27.jpg",
  },
  {
    id: 13,
    quote:
      "A house is made of walls and beams; a home is built with love and dreams.",
    attribution: {
      name: "Unknown",
      title: "Proverb",
    },
    caption: "We build homes that hold stories, not just structures.",
    image: "lcs-banner-07.jpg",
  },
].map((item) => ({
  ...item,
  image: `/assets/images/hero/${item.image}`,
}));

const IntroSection: React.FC = () => {
  const [fromIndex, setFromIndex] = useState(0);
  const [toIndex, setToIndex] = useState(1);
  const [progress, setProgress] = useState(0);
  const [textOpacity, setTextOpacity] = useState(1); // New state for text opacity
  const [currentBg, setCurrentBg] = useState(headlines[0].image);

  useEffect(() => {
    AOS.init({
      once: true, // animate only once per element (optional)
      duration: 400, // default duration
    });
    AOS.refresh();
  }, []);

  // Preload all images
  useEffect(() => {
    headlines.forEach((headline) => {
      const img = new Image();
      img.src = headline.image;
    });
  }, []);

  // Continuous infinite slideshow with pause
  useEffect(() => {
    let rafId: number;
    let startTime = performance.now();
    let phase: "transition" | "pause" = "transition";
    const TRANSITION_DURATION = 4000; // 4s
    const PAUSE_DURATION = 8000; // 8s

    const animate = (now: number) => {
      const elapsed = now - startTime;

      if (phase === "transition") {
        const p = Math.min(elapsed / TRANSITION_DURATION, 1);
        setProgress(p);
        setTextOpacity(p); // Fade in text during transition

        if (p >= 1) {
          // Switch to pause phase
          phase = "pause";
          startTime = performance.now();
        }
      } else if (phase === "pause") {
        setProgress(1); // Hold final frame

        // Handle text fading during pause
        if (elapsed < PAUSE_DURATION / 2) {
          setTextOpacity(1); // Fully visible for first half
        } else {
          // Fade out during second half
          const fadeProgress =
            (elapsed - PAUSE_DURATION / 1) / (PAUSE_DURATION / 1);
          setTextOpacity(1 - fadeProgress);
        }

        // if (elapsed >= PAUSE_DURATION) {
        //   // Move to next slide and start transition
        //   setFromIndex(toIndex);
        //   setToIndex((prev) => (prev + 1) % headlines.length);

        //   phase = "transition";
        //   startTime = performance.now();
        //   setProgress(0);

        //   // Reset AOS animation classes on elements inside .banner-content
        //   const bannerContent = document.querySelector(".banner-content");
        //   if (bannerContent) {
        //     bannerContent.querySelectorAll("[data-aos]").forEach((el) => {
        //       el.classList.remove("aos-animate");
        //       (el as HTMLElement).style.opacity = ""; // cast to HTMLElement to access style
        //     });
        //   }

        //   // Then refresh AOS to re-detect and animate
        //   AOS.refresh();
        // }

        if (elapsed >= PAUSE_DURATION) {
          setFromIndex(toIndex);
          const nextIndex = (toIndex + 1) % headlines.length;
          setToIndex(nextIndex);
          setCurrentBg(headlines[nextIndex].image); // <-- update background to the one we just switched to

          phase = "transition";
          startTime = performance.now();
          setProgress(0);

          // Reset AOS animation classes...
          const bannerContent = document.querySelector(".banner-content");
          if (bannerContent) {
            bannerContent.querySelectorAll("[data-aos]").forEach((el) => {
              el.classList.remove("aos-animate");
              (el as HTMLElement).style.opacity = "";
            });
          }
          AOS.refresh();
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [toIndex]);

  const from = headlines[fromIndex];
  const to = headlines[toIndex];

  return (
    <section
      id="intro"
      className="position-relative overflow-hidden"
      style={{
        height: "100vh",
        //backgroundImage: `url('${headlines[0].image}')`,
        backgroundImage: `url('${currentBg}')`,
        backgroundSize: "cover",
        objectPosition: "center",
      }}
    >
      <div className="image-holder position-relative">
        <BannerTransition from={from.image} to={to.image} progress={progress} />
      </div>
      <div style={{ width: "100%", height: "100vh" }}>
        <canvas id="glsl-canvas" />
        <div className={styles["overlay-circle"]} />
      </div>
      <div
        className="position-absolute top-50 start-50 translate-middle w-100 banner-texts"
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="banner-content text-center mt-30"
          style={{ opacity: textOpacity }} // Apply text opacity here
        >
          <h1
            className={`${styles["banner-quote"]} light text-uppercase fw-bold`}
          >
            {from.quote}
            <span className={styles["banner-quote-by"]}>
              — {from.attribution.name}, <i>{from.attribution.title}</i>
            </span>
          </h1>
          <h3 className={`${styles["banner-quote-ladon"]} mt-10`}>
            {from.caption}
          </h3>
          <a
            href="#projects"
            className="btn-slide btn-medium btn-light hover-slide-right text-uppercase mt-5 d-inline-block"
          >
            <span>View our projects</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
