const Footer = () => {
  return (
    <footer className="bg-dark text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Subscription Management
            </h2>

            <p className="text-white/70">
              Simplifying subscription and organization
              management through a centralized SaaS platform.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2 text-white/70">
              <li>
                <a href="#home">Home</a>
              </li>

              <li>
                <a href="#feature">Features</a>
              </li>

              <li>
                <a href="#price">Pricing</a>
              </li>

              <li>
                <a href="#about">About</a>
              </li>
            </ul>
          </div>

          {/* Modules */}
          <div>
            <h3 className="font-semibold mb-4">
              Modules
            </h3>

            <ul className="space-y-2 text-white/70">
              <li>User Management</li>
              <li>Subscription Tracking</li>
              <li>Billing Management</li>
              <li>Plan Management</li>
            </ul>
          </div>

          {/* Contact */}
          <div id="contact">
            <h3 className="font-semibold mb-4">
              Contact
            </h3>

            <ul className="space-y-2 text-white/70">
              <li>support@subsmanager.com</li>
              <li>Pune, Maharashtra</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 mt-12 pt-6 text-center text-white/60">
          © {new Date().getFullYear()} SubsManager. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;