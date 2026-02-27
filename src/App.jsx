import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import MainLayout from "./layouts/MainLayout";

import Landing from "./pages/public/Landing";
import Login from "./pages/public/Login";
import Signup from "./pages/public/Signup";
import Payment from "./pages/public/Payment";

import Dashboard from "./pages/app/Dashboard";
import JobDescriptions from "./pages/app/JobDescriptions";
import Interviews from "./pages/app/Interviews";
import Reports from "./pages/app/Reports";
import Subscription from "./pages/app/Subscription";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}


function App() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>

          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<PageWrapper><Landing /></PageWrapper>} />
            <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
            <Route path="/signup" element={<PageWrapper><Signup /></PageWrapper>} />
            <Route path="/payment/:plan" element={<PageWrapper><Payment /></PageWrapper>} />
          </Route>

          {/* Authenticated App Routes */}
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/job-descriptions" element={<JobDescriptions />} />
            <Route path="/interviews" element={<Interviews />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/subscription" element={<Subscription />} />
          </Route>

        </Routes>
      </AnimatePresence>
    </>
  );
}

/* ===== PAGE TRANSITION WRAPPER ===== */
function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default App;