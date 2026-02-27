import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const pageTitleMap = {
    "/dashboard": "Dashboard",
    "/job-descriptions": "Job Descriptions",
    "/interviews": "Interviews",
    "/reports": "Reports",
    "/subscription": "Subscription",
  };

  const title = pageTitleMap[location.pathname] || "Dashboard";

  /* ================= CLOSE DROPDOWN ON OUTSIDE CLICK ================= */
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <div className="h-20 flex items-center justify-between px-10 bg-white/60 backdrop-blur-xl border-b border-gray-200/40 relative z-50">

      <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
        {title}
      </h1>

      <div className="flex items-center gap-5 relative" ref={dropdownRef}>
        
        <span className="text-xs px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-100 to-indigo-50 text-primary font-medium">
          Free Plan
        </span>

        {/* ================= PROFILE AVATAR ================= */}
        <div
          onClick={() => setOpen(!open)}
          className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-200 to-indigo-100 flex items-center justify-center text-sm font-semibold text-indigo-700 shadow-sm cursor-pointer hover:scale-105 transition-all duration-200"
        >
          Y
        </div>

        {/* ================= DROPDOWN MENU ================= */}
        {open && (
          <div className="absolute right-0 top-16 w-52 bg-white z-[100] rounded-2xl shadow-xl border border-gray-200 p-3 space-y-2">
            
            <button
              onClick={() => navigate("/subscription")}
              className="w-full text-left px-4 py-2 rounded-xl text-sm text-gray-700 hover:bg-gray-100 transition"
            >
              Manage Subscription
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="w-full text-left px-4 py-2 rounded-xl text-sm text-gray-700 hover:bg-gray-100 transition"
            >
              My Dashboard
            </button>

            <div className="border-t border-gray-200 my-2"></div>

            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50 transition"
            >
              Logout
            </button>

          </div>
        )}

      </div>

    </div>
  );
}

export default Header;