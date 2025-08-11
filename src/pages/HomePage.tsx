// Layout
import AppLayout from "@/components/AppLayout";

// Sections
import IntroSection from "@/components/IntroSection";
import AboutSection from "@/components/AboutSection";
import AchievementsSection from "@/components/AchievementsSection";
import BlogsSection from "@/components/BlogsSection";
import ClientsCollectionSection from "@/components/ClientsCollectionSection";
import ProjectsFeaturedSection from "@/components/ProjectsFeaturedSection";
import ServicesSection from "@/components/ServicesSection";
import ReviewsSection from "@/components/ReviewsSection";

const Home = () => {
  return (
    // <div id="wrapper">
    <div className="overflow-hidden">
      <AppLayout>
        <IntroSection />
        <AboutSection />
        <ProjectsFeaturedSection />
        <ServicesSection />
        <ClientsCollectionSection />
        <ReviewsSection />
        <AchievementsSection />
        <BlogsSection />
      </AppLayout>
    </div>
  );
};

export default Home;
