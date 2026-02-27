import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { motion } from "framer-motion";

function MainLayout() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-white via-indigo-50/30 to-white">

      {/* Floating Gradient Blob */}
    <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-indigo-200/40 rounded-full blur-3xl opacity-60 animate-pulse"></div>

    <Sidebar />

      <div className="flex-1 flex flex-col">

        <Header />

        <main className="p-10 flex-1">
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