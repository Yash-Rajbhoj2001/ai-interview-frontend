import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { motion } from "framer-motion";

function MainLayout() {
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
        <main className="flex-1 overflow-y-auto mt-20 p-10 h-screen">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Outlet />
          </motion.div>
        </main>

      </div>
    </div>
  );
}

export default MainLayout;