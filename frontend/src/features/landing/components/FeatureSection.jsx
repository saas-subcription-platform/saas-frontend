import { FEATURES } from "../constants/features.constants";
import {
  Clock3,
  CalendarDays,
  Target,
  MessageSquare,
} from "lucide-react";

const iconMap ={
    "Timesheet Management": Clock3,
    "Leave Management": CalendarDays,
    "Goals & Performance": Target,
    "Team Collaboration": MessageSquare,
}

const FeaturesSection =()=>{
    console.log(FEATURES);
    return (
        <section id="feature" className="py-24 px-6 bg-background">
            <div className="max-w-7xl mx-auto">
                {/* section heading */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-dark">
                        Everything You Need To Manage Subscriptions
                    </h2>
                    <p className="mt-4 text-lg text-dark/70 max-w-3xl mx-auto">
                        Powerful tools designed to simplify subscription management,
                        customer onboarding, billing, and plan administration.
                    </p>
                </div>
                {/*Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {FEATURES.map((features) =>{
                        const IconComponent = iconMap[features.title];

                        return (
                            <div key={features.title} className="bg-white border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                                <div className="w-14 h-14 rounded-xl bg-secondary/20 flex items-center justify-center mb-6">
                                    <IconComponent size={28} className="text-primary" />
                                </div>
                                <h3 className="text-2xl font-semibold text-dark mb-4">
                                    {features.title}
                                </h3>
                                <p className="text-dark/70 leading-relaxed">
                                    {features.description}
                                </p>
                            </div>
                        )
                    })}

                </div>
            </div>

        </section>
    );
}

export default FeaturesSection;