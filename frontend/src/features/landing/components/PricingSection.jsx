import PricingCard from "../../../components/ui/PricingCard";
import { PRICING_PLANS } from "../constants/pricing.constants";

const PricingSection = () => {
  return (
    <section id="price" className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-dark">
            Subscription Plans
          </h2>

          <p className="mt-4 text-lg text-dark/70 max-w-3xl mx-auto">
            Flexible plans designed for organizations
            of all sizes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PRICING_PLANS.map((plan) => (
            <PricingCard
              key={plan.title}
              {...plan}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default PricingSection;