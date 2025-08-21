// Intro.tsx
import React, { useState, useEffect, useRef } from "react";
import styles from "@/styles/_components/Intro.module.css";
import BannerTransition from "./ui/banner-transition";
import { url } from "inspector";

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
    quote: "Each brick laid is a promise kept. Every foundation laid is a promise honored.",
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
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // Preload images
  useEffect(() => {
    headlines.forEach((headline) => {
      const img = new Image();
      img.src = headline.image;
    });
  }, []);

  // Cycle through headlines every 8 seconds (4s static + 4s transition)
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % headlines.length);
      setProgress(0);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // Animate progress from 0 to 1 over 4 seconds
  useEffect(() => {
    const animate = (timestamp: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = timestamp;
      }

      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      setProgress((prev) => {
        const next = Math.min(prev + deltaTime / 4000, 1); // 4000ms = 4s
        return next;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [index]);

  const from = headlines[index];
  const to = headlines[(index + 1) % headlines.length];

  return (
    <section
      id="intro"
      className="position-relative overflow-hidden"
      style={{
        height: "100vh",
        //backgroundImage: `url(${from.image})`,
      }}
    >
      <div className="image-holder position-relative">
        <BannerTransition from={from.image} to={to.image} progress={progress} />
      </div>

      {/* <div style={{ width: "100%", height: "100vh" }}>
        <canvas id="glsl-canvas" />
        <div className={styles["overlay-circle"]} />
      </div> */}

      <div
        className="position-absolute top-50 start-50 translate-middle w-100"
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="banner-content text-center">
          <h1
            className={`${styles["banner-title"]} light text-uppercase fw-bold`}
            data-aos="fade-up"
            data-aos-delay="0"
            data-aos-duration="800"
          >
            {from.quote}
            <span className={styles["banner-title-half"]}>
              — {from.attribution.name}, <i>{from.attribution.title}</i>
            </span>
          </h1>
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
