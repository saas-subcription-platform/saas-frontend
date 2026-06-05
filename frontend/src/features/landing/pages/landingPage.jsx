import Navbar from "../../../components/common/Navbar";
import AboutSection from "../components/AboutusSection";
import FeaturesSection from "../components/featureSection";
import Footer from "../components/FooterSection";
import HeroSection from "../components/HeroSection";
import PricingSection from "../components/PricingSection";
import WorkflowSection from "../components/WorkflowSection";

function LandingPage(){
    return (
        <>
            <Navbar/>
            <HeroSection/>
            <WorkflowSection/>
            <FeaturesSection/>
            <PricingSection/>
            <AboutSection/>
            <Footer/>
        </>
    )
}

export default LandingPage;
