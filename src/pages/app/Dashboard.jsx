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
        className="bg-white/70 backdrop-blur-xl rounded-3xl p-10 shadow-sm border border-gray-200/50 relative overflow-hidden"
      >
        {/* subtle glow */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-200/40 rounded-full blur-2xl pointer-events-none"></div>

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
        <KpiCard title="Improvement Rate" value="+14%" positive />
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
            className="px-6 py-3 rounded-2xl bg-gray-900 text-white font-medium hover:bg-black hover:scale-[1.03] transition-all duration-300"
          >
            Add Job Description
          </Link>

          <Link
            to="/interviews"
            className="px-6 py-3 rounded-2xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:scale-[1.03] transition-all duration-300"
          >
            Start New Interview
          </Link>

          <Link
            to="/reports"
            className="px-6 py-3 rounded-2xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:scale-[1.03] transition-all duration-300"
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

        <div className="text-center py-12">
          <p className="text-gray-500 text-sm">
            You haven't completed any interviews yet.
          </p>
          <Link
            to="/interviews"
            className="inline-block mt-4 px-6 py-3 rounded-2xl bg-gray-900 text-white font-medium hover:bg-black hover:scale-[1.03] transition-all duration-300"
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
          <ProgressBar label="Communication" value={80} />
          <ProgressBar label="Technical Skills" value={72} />
          <ProgressBar label="Problem Solving" value={85} />
          <ProgressBar label="Confidence" value={76} />
        </div>
      </div>

    </div>
  );
}

/* ================= KPI COMPONENT ================= */
function KpiCard({ title, value, positive }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-sm border border-gray-200/50 hover:shadow-lg transition-all duration-300"
    >
      <h3 className="text-sm text-gray-500 mb-2">{title}</h3>

      <p className="text-3xl font-semibold text-gray-900 flex items-center gap-2">
        {value}
        {positive && (
          <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded-full">
            ↑
          </span>
        )}
      </p>
    </motion.div>
  );
}

/* ================= PROGRESS COMPONENT ================= */
function ProgressBar({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-2">{label}</p>

      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8 }}
          className="bg-indigo-600 h-3 rounded-full"
        />
      </div>
    </div>
  );
}

export default Dashboard;