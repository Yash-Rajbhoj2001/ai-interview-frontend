import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-10">

      {/* ================= WELCOME SECTION ================= */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/70 backdrop-blur-xl rounded-3xl p-10 shadow-sm border border-gray-200/50"
      >
        <h2 className="text-3xl font-semibold tracking-tight text-gray-900 mb-2">
          Welcome back 👋
        </h2>
        <p className="text-gray-500">
          Track your performance, manage interviews, and improve consistently.
        </p>
      </motion.div>

      {/* ================= KPI CARDS ================= */}
      <div className="grid md:grid-cols-4 gap-6">

        <KpiCard title="Total Interviews" value="12" />
        <KpiCard title="Average Score" value="82%" />
        <KpiCard title="Improvement Rate" value="+14%" />
        <KpiCard title="Active Plan" value="Free" />

      </div>

      {/* ================= QUICK ACTIONS ================= */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-sm border border-gray-200/50">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Quick Actions
        </h3>

        <div className="flex flex-wrap gap-4">
          <Link
            to="/job-descriptions"
            className="px-6 py-3 rounded-2xl bg-gray-900 text-white font-medium hover:bg-black transition"
          >
            Add Job Description
          </Link>

          <Link
            to="/interviews"
            className="px-6 py-3 rounded-2xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
          >
            Start New Interview
          </Link>

          <Link
            to="/reports"
            className="px-6 py-3 rounded-2xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
          >
            View Reports
          </Link>
        </div>
      </div>

      {/* ================= RECENT INTERVIEWS ================= */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-sm border border-gray-200/50">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Recent Interviews
        </h3>

        {/* Empty State (Backend Ready) */}
        <div className="text-center py-12">
          <p className="text-gray-500 text-sm">
            You haven't completed any interviews yet.
          </p>
          <Link
            to="/interviews"
            className="inline-block mt-4 px-6 py-2 rounded-xl bg-gray-900 text-white text-sm hover:bg-black transition"
          >
            Start Practicing
          </Link>
        </div>
      </div>

      {/* ================= PERFORMANCE OVERVIEW ================= */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-sm border border-gray-200/50">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Performance Overview
        </h3>

        <div className="grid md:grid-cols-2 gap-8">

          <div>
            <p className="text-sm text-gray-500 mb-2">Communication</p>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-gray-900 h-3 rounded-full w-[80%]"></div>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-2">Technical Skills</p>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-gray-900 h-3 rounded-full w-[72%]"></div>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-2">Problem Solving</p>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-gray-900 h-3 rounded-full w-[85%]"></div>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-2">Confidence</p>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-gray-900 h-3 rounded-full w-[76%]"></div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

/* ================= KPI COMPONENT ================= */
function KpiCard({ title, value }) {
  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-sm border border-gray-200/50 hover:shadow-md transition-all duration-300">
      <h3 className="text-sm text-gray-500 mb-2">{title}</h3>
      <p className="text-3xl font-semibold text-gray-900">{value}</p>
    </div>
  );
}

export default Dashboard;