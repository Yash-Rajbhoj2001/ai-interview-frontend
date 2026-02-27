import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

function MainLayout() {
  const location = useLocation();

  return (
    
    <div className="h-screen flex overflow-hidden bg-gradient-to-br from-white via-indigo-50/30 to-white relative">

      {/* Floating Gradient Blob */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-indigo-200/40 rounded-full blur-3xl opacity-60 animate-pulse pointer-events-none"></div>

      {/* ================= SIDEBAR (FIXED) ================= */}
      <div className="w-64 fixed left-0 top-0 h-full z-40">
        <Sidebar />
      </div>

      {/* ================= MAIN WRAPPER ================= */}
      <div className="flex-1 flex flex-col ml-64">

        {/* ================= HEADER (FIXED) ================= */}
        <div className="fixed top-0 left-64 right-0 z-30">
          <Header />
        </div>

        {/* ================= SCROLLABLE CONTENT ================= */}
          <main className="absolute top-20 left-64 right-0 bottom-0 overflow-y-auto p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.40, ease: "easeOut" }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </main>

      </div>
    </div>
  );
}

export default MainLayout;