import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "./Header";
import Footer from "./Footer";
import CookieConsentBanner from "./CookieConsentBanner";
import ScrollToTopButton from "./ScrollToTopButton";
import CTASection from "./CTASection";

type LayoutProps = {
  children: React.ReactNode;
  showCTA?: boolean; // optional prop with default behavior
};

const AppLayout = ({ children, showCTA = true }: LayoutProps) => {
  useEffect(() => {
    AOS.init({
      once: true, // Animates only once
      duration: 800, // Animation duration in ms
      easing: "ease-out", // Animation easing
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      {showCTA && <CTASection />}
      <Footer />
      <ScrollToTopButton />
      <CookieConsentBanner />
    </div>
  );
};

export default AppLayout;
