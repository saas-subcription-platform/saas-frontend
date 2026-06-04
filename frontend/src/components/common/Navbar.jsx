import { Link } from "react-router-dom";

function Navbar(){
    return(
        <nav className="bg-white border-b border-border sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* logo */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold">SP</div>
                    <h1 className="text-2xl font-bold text-dark">SaaS Platform</h1>
                </div>
                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-8">
                    <a href="#modules" className="text-dark hover:text-primary">Modules</a>
                    <a href="#pricing" className="text-dark hover:text-primary">Pricing</a>
                    <a href="#about" className="text-dark hover:text-primary">About Us</a>
                    <a href="#contact" className="text-dark hover:text-primary">Contact Us</a>      
                </div>
                {/* Right Side Buttons */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-4">
                        <button className="px-4 py-2 rounded-lg border border-border text-dark hover:bg-gray-50">
                            Login
                        </button>
                        <button className="px-5 py-2 rounded-lg bg-primary text-white hover:bg-primary-hover">
                            Get Started
                        </button>
                    </div>
                </div>
            </div>

        </nav>
    )

}

export default Navbar;