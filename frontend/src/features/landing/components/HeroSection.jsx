import { ArrowRight, CheckCircle } from "lucide-react";
import { HERO_CONTENT } from "../constants/hero.constants";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section
      id="home"
      className="bg-background py-8 px-6 border-t border-border"
    >
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h1 className="max-w-5xl mx-auto text-5xl md:text-7xl font-bold leading-tight text-dark ">
          {HERO_CONTENT.title}
          <br />
          <span className="text-primary">{HERO_CONTENT.highlightedTitle}</span>
        </h1>
        {/*Description */}
        <p className="max-w-3xl mx-auto mt-8 text-lg md:text-xl text-dark/70 leading-relaxed">
          {HERO_CONTENT.description}
        </p>
        {/*Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
          <button
            onClick={() => navigate("/register")}
            className="bg-primary hover:bg-primary-hover text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            {HERO_CONTENT.primaryButtonText}
            <ArrowRight size={18} />
          </button>
          <button className="border border-border bg-white hover:bg-background text-dark font-semibold px-8 py-4 rounded-lg transition-all duration-300">
            {HERO_CONTENT.secondaryButtonText}
          </button>
        </div>
        {/*Benifits */}
        <div className="flex flex-wrap justify-center gap-6 mt-10">
          {HERO_CONTENT.benifits.map((benifit) => (
            <div key={benifit} className="flex items-center gap-2 text-dark/70">
              <CheckCircle size={18} className="text-primary" />
              <span>{benifit}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
