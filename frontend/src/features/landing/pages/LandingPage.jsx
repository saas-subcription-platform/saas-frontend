import Navbar from "../../../components/common/Navbar";
import AboutSection from "../components/AboutusSection";
import FeaturesSection from "../components/FeatureSection";
import Footer from "../components/FooterSection";
import HeroSection from "../components/HeroSection";
import PricingSection from "../components/PricingSection";
import WorkflowSection from "../components/WorkflowSection";
import Chatbot from "../../chatbot/pages/chatBot";  

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function LandingPage() {
  
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(
        location.hash.replace("#", "")
      );

      if (element) {
        setTimeout(() => {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      }
    }
  }, [location]);

  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <WorkflowSection />
      <PricingSection />
      <AboutSection />
      <Footer />

      <Chatbot />  
    </>
  );
}

export default LandingPage;