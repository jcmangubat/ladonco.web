import { useEffect } from 'react';
import Swiper from 'swiper';
import AOS from 'aos';
import { jarallax } from 'jarallax';
import 'jarallax/dist/jarallax.css';
import 'swiper/css';
import 'aos/dist/aos.css';

export const useLibraries = () => {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 2500,
      once: true,
    });
    
    // Initialize Jarallax
    jarallax(document.querySelectorAll('.jarallax'), {
      speed: 0.2,
    });
    
    // Initialize Swiper
    const teamSwiper = new Swiper('.team-swiper', {
      slidesPerView: 3,
      spaceBetween: 30,
      navigation: {
        nextEl: '.icon-arrow-right',
        prevEl: '.icon-arrow-left',
      },
      breakpoints: {
        0: { slidesPerView: 1, spaceBetween: 20 },
        767: { slidesPerView: 2, spaceBetween: 20 },
        1299: { slidesPerView: 3, spaceBetween: 20 },
      },
    });
    
    const reviewSwiper = new Swiper('.review-swiper', {
      slidesPerView: 3,
      spaceBetween: 30,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        0: { slidesPerView: 1, spaceBetween: 20 },
        767: { slidesPerView: 2, spaceBetween: 20 },
        1299: { slidesPerView: 3, spaceBetween: 20 },
      },
    });
    
    // Cleanup
    return () => {
      teamSwiper.destroy();
      reviewSwiper.destroy();
    };
  }, []);
};