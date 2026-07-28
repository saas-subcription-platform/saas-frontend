import { Check } from "lucide-react";

const PricingCard = ({ plan, onSelect }) => {
  // Default to Monthly pricing
  const monthlyPricing = plan.pricingOptions?.find(
    (pricing) => pricing.billingCycle === "MONTHLY"
  );

  // Highlight Professional plan
  const isPopular = plan.planName === "Professional";

  return (
    <div
      className={`
        relative bg-white rounded-2xl border
        p-8 transition-all duration-300
        hover:shadow-xl
        ${
          isPopular
            ? "border-primary shadow-lg scale-105"
            : "border-border"
        }
      `}
    >
      {isPopular && (
        <span
          className="
            absolute -top-4 left-1/2 -translate-x-1/2
            bg-primary text-white text-sm font-medium
            px-4 py-1 rounded-full
          "
        >
          Most Popular
        </span>
      )}

      <div className="text-center">
        <h3 className="text-2xl font-bold text-dark">
          {plan.planName}
        </h3>

        <div className="mt-6">
          <span className="text-5xl font-bold text-dark">
            ₹{monthlyPricing?.price}
          </span>

          <span className="text-dark/60 ml-1">
            /month
          </span>
        </div>

        <p className="mt-4 text-dark/70">
          {plan.planDescription}
        </p>

        <p className="mt-2 text-sm font-medium text-primary">
          Up to {plan.maximumUsers} Users
        </p>
      </div>

      <ul className="mt-8 space-y-4">
        {plan.features?.map((feature) => (
          <li
            key={feature.id}
            className="flex items-center gap-3"
          >
            <Check
              size={18}
              className="text-primary flex-shrink-0"
            />

            <span className="text-dark">
              {feature.featureName}
            </span>
          </li>
        ))}
      </ul>

      <button
        onClick={onSelect}
        className={`
          w-full mt-8 py-3 rounded-xl font-medium transition-all duration-300
          ${
            isPopular
              ? "bg-primary text-white hover:bg-primary-hover"
              : "border border-border text-dark hover:bg-background"
          }
        `}
      >
        Get Started
      </button>
    </div>
  );
};

export default PricingCard;