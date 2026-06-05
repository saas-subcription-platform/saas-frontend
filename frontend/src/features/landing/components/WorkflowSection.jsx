import { WORKFLOW_HIGHLIGHTS } from "../constants/workflow.constants";
import { Building2, Users, Layers } from "lucide-react";

const iconMap = {
  organization: Building2,
  user: Users,
  module: Layers,
};

const WorkflowSection = () => {
  return (
    <section id="workflow" className="py-10 px-6 border-y border-border">
      <div className="max-w-7xl mx-auto">

        {/* Section Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-dark">
            Built For Growing Organizations
          </h2>

          <p className="mt-4 text-dark/70 max-w-2xl mx-auto">
            A centralized SaaS platform that enables organizations
            to manage users, subscribe to business modules,
            and streamline operations from a single dashboard.
          </p>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {WORKFLOW_HIGHLIGHTS.map((item) => {
            const IconComponent = iconMap[item.icon];

            return (
              <div
                key={item.title}
                className="
                  bg-white
                  border
                  border-border
                  rounded-2xl
                  p-6
                  text-center
                  hover:shadow-lg
                  transition-all
                  duration-300
                "
              >
                <div
                  className="
                    w-16
                    h-16
                    mx-auto
                    mb-4
                    rounded-xl
                    bg-secondary/20
                    flex
                    items-center
                    justify-center
                  "
                >
                  <IconComponent
                    size={30}
                    className="text-primary"
                  />
                </div>

                <h3 className="text-xl font-semibold text-dark">
                  {item.title}
                </h3>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WorkflowSection;