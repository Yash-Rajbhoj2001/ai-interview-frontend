import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/signup";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-md border-b border-gray-200"
          : "bg-white/70 backdrop-blur-xl border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        <Link to="/" className="text-lg font-semibold tracking-tight">
          AI.<span className="text-primary"> Interview</span>
        </Link>

        {/* Hide buttons on Login/Signup if you want
        {!isAuthPage && (
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-sm text-gray-600 hover:text-gray-900 transition"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="px-5 py-2 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-black transition"
            >
              Sign Up
            </Link>
          </div>
        )} */}

      </div>
    </header>
  );
}

export default Navbar;