import { Link, useNavigate } from "react-router-dom";
import { useState,useRef,useEffect } from "react";
import { ChevronDown } from "lucide-react";

function Navbar(){
    const navigate = useNavigate();
    const [showModules, setShowModules] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !    dropdownRef.current.contains(event.target)) {
                setShowModules(false);
            }
        };

  document.addEventListener("click", handleClickOutside);

  return () => {
    document.removeEventListener("click", handleClickOutside);
  };
}, []);
    
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
                            <div ref={dropdownRef} className="relative" onMouseEnter={() => setShowModules(true)}
                                onClick={() => setShowModules(false)}>
                                <button className="flex items-center gap-1 text-dark hover:text-primary">
                                    Modules
                                    <ChevronDown size={16} />
                                </button>

                                {showModules && (
                                    <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-border rounded-xl shadow-lg py-2 z-50">
                                    <a href="#feature" className="block px-5 py-3 hover:bg-green-50">
                                       Timesheet Management
                                    </a>

                                    <a href="#feature" className="block px-5 py-3 hover:bg-green-50">
                                        Leave Management
                                    </a>

                                    <a href="#feature" className="block px-5 py-3 hover:bg-green-50">
                                            Goals & Performance
                                    </a>

                                    <a href="#feature" className="block px-5 py-3 hover:bg-green-50">
                                            Team Collaboration
                                    </a>
                    </div>
                )}
                </div>
                    <a href="#price" className="text-dark hover:text-primary">Pricing</a>
                    <a href="#about" className="text-dark hover:text-primary">About Us</a>
                    <a href="#contact" className="text-dark hover:text-primary">Contact Us</a>      
                </div>
                {/* Right Side Buttons */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-4">
                        <button onClick={()=>navigate('/login')} className="px-4 py-2 rounded-lg border border-border text-dark hover:bg-gray-50">
                            Login
                        </button>
                        <button 
                        onClick={() => navigate('/register')}
                        className="px-5 py-2 rounded-lg bg-primary text-white hover:bg-primary-hover">
                            Get Started
                        </button>
                    </div>
                </div>
            </div>

        </nav>
    )

}

export default Navbar;