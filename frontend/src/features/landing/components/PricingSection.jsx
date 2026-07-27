import { useNavigate } from "react-router-dom";
import PricingCard from "../../../components/ui/PricingCard";
// import { PRICING_PLANS } from "../constants/pricing.constants";

import { useEffect,useState } from "react";
import { getAllSubscriptionPlans } from "../../../subscription/services/subscriptionPlanService"

const PricingSection = () => {

  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await getAllSubscriptionPlans();
        setPlans(data);
      } catch (error) {
        console.error("Error fetching subscription plans:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

    if (loading) {
    return (
      <section id="price" className="py-24 px-6 bg-background">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-dark">
            Loading Subscription Plans...
          </h2>
        </div>
      </section>
    );
  }

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
          {plans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              onSelect={() => navigate(`/checkout?plan=${plan.id}`)}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default PricingSection;