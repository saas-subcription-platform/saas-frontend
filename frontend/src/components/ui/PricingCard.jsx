import { Check } from "lucide-react";

const PricingCard = ({
    title,
    price,
    description,
    features,
    popular = false,
}) =>{
    return (
        <div
      className={`
        relative bg-white rounded-2xl border
        p-8 transition-all duration-300
        hover:shadow-xl
        ${
          popular
            ? "border-primary shadow-lg scale-105"
            : "border-border"
        }
      `}
    >
      {popular && (
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
          {title}
        </h3>

        <div className="mt-6">
          <span className="text-5xl font-bold text-dark">
            {price}
          </span>

          {price !== "Custom" && (
            <span className="text-dark/60 ml-1">
              /month
            </span>
          )}
        </div>

        <p className="mt-4 text-dark/70">
          {description}
        </p>
      </div>

      <ul className="mt-8 space-y-4">
        {features.map((feature) => (
          <li
            key={feature}
            className="flex items-center gap-3"
          >
            <Check
              size={18}
              className="text-primary"
            />

            <span className="text-dark">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <button
        className={`
          w-full mt-8 py-3 rounded-xl font-medium
          transition-all duration-300
          ${
            popular
              ? "bg-primary text-white hover:bg-primary-hover"
              : "border border-border text-dark hover:bg-background"
          }
        `}
      >
        Get Started
      </button>
    </div>
    );
}

export default PricingCard;