import { NavLink, Link } from "react-router-dom";
import { LayoutDashboard, FileText, Mic, BarChart3, CreditCard } from "lucide-react";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Job Descriptions", path: "/job-descriptions", icon: FileText },
  { name: "Interviews", path: "/interviews", icon: Mic },
  { name: "Reports", path: "/reports", icon: BarChart3 },
  { name: "Subscription", path: "/subscription", icon: CreditCard },
];

function Sidebar() {
  return (
    <div className="w-64 min-h-screen px-6 py-8 backdrop-blur-xl bg-white/70 border-r border-gray-200/50 flex flex-col">

      <div className="text-2xl font-semibold tracking-tight text-gray-900 mb-12">
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `text-lg font-semibold tracking-tight cursor-pointer transition ${
            isActive ? "text-gray-900" : "text-gray-700 hover:text-gray-900 duration-200"
          }`
        }
      >
        AI.<span className="text-primary"> Interview</span>
      </NavLink>
      </div>

      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <NavLink key={item.path} to={item.path}>
                {({ isActive }) => {
                    const Icon = item.icon;

                    return (
                    <div
                        className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 ${
                        isActive
                            ? "bg-gradient-to-r from-indigo-100 to-indigo-50 text-primary shadow-sm"
                            : "text-gray-500 hover:text-gray-900 hover:bg-white/60 hover:scale-[1.02]"
                        }`}
                    >
                        <Icon size={18} />
                        {item.name}
                    </div>
                    );
                }}
        </NavLink>
        ))}
      </nav>

      <div className="mt-auto text-xs text-gray-400 pt-10">
        AI. Interview
      </div>
    </div>
  );
}

export default Sidebar;