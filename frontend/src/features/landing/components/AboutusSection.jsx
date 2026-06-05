const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-dark">
            About Us
          </h2>

          <p className="mt-4 text-lg text-dark/70 max-w-3xl mx-auto">
            Subscription Management is a SaaS platform designed to help
            organizations manage subscriptions, users, modules,
            billing, and operational workflows from a centralized dashboard.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">

          <div>
            <h3 className="text-3xl font-semibold text-dark mb-6">
              Why Choose Subscription Management?
            </h3>

            <ul className="space-y-4 text-dark/80">
              <li>
                 Centralized organization management
              </li>

              <li>
                 Flexible module-based subscriptions
              </li>

              <li>
                 User and role management
              </li>

              <li>
                 Subscription tracking and billing
              </li>

              <li>
                 Scalable architecture for growing businesses
              </li>
            </ul>
          </div>

          <div className="bg-white border border-border rounded-2xl p-8">
            <h4 className="text-2xl font-semibold text-dark mb-4">
              Our Mission
            </h4>

            <p className="text-dark/70 leading-relaxed">
              To simplify subscription management for organizations
              by providing a secure, scalable, and user-friendly
              platform that streamlines business operations and
              improves efficiency.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;