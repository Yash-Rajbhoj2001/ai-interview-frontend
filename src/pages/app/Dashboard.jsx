import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Dashboard() {

  const API_BASE = "https://ai-interview-backend-wifh.onrender.com/api";

  const getToken = () => localStorage.getItem("access_token");

  const [user, setUser] = useState(null);
  const [interviews, setInterviews] = useState([]);

  const [avgScore, setAvgScore] = useState(0);
  const [improvement, setImprovement] = useState(0);
  const [jdList, setJdList] = useState([]);

  useEffect(() => {

    

    const fetchData = async () => {

      try {

        const jdRes = await fetch(`${API_BASE}/jd/`, {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        });

        const jdData = await jdRes.json();

        setJdList(jdData);

        /* ================= FETCH USER ================= */

        const userRes = await fetch(`${API_BASE}/users/me/`, {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        });

        const userData = await userRes.json();
        setUser(userData);

        /* ================= FETCH INTERVIEWS ================= */

        const interviewRes = await fetch(`${API_BASE}/interviews/`, {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        });

        const interviewData = await interviewRes.json();

        setInterviews(interviewData);

        /* ================= KPI CALCULATIONS ================= */

        if (interviewData.length > 0) {

          const scores = interviewData.map(i => i.final_score || 0);

          const avg =
            scores.reduce((a, b) => a + b, 0) / scores.length;

          setAvgScore(Math.round(avg));

          if (scores.length >= 2) {

            const first = scores[0];
            const last = scores[scores.length - 1];

            const improvementRate =
              ((last - first) / first) * 100;

            setImprovement(Math.round(improvementRate));
          }
        }

      } catch (err) {

        console.error("Dashboard load failed", err);

      }

    };

    fetchData();

  }, []);

  const recent = interviews.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto space-y-10">

      {/* ================= WELCOME SECTION ================= */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/70 backdrop-blur-xl rounded-3xl p-10 shadow-sm border border-gray-200/50 relative overflow-hidden"
      >
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-200/40 rounded-full blur-2xl pointer-events-none"></div>

        <h2 className="text-3xl font-semibold tracking-tight text-gray-900 mb-2">
          Welcome back {user?.first_name || ""} 👋
        </h2>

        <p className="text-gray-500">
          Track your performance, manage interviews, and improve consistently.
        </p>
      </motion.div>

      {/* ================= KPI CARDS ================= */}
      <div className="grid md:grid-cols-4 gap-6">
        <KpiCard
          title="Total Interviews"
          value={interviews.length}
        />

        <KpiCard
          title="Average Score"
          value={`${avgScore}%`}
        />

        <KpiCard
          title="Improvement Rate"
          value={`${improvement}%`}
          positive={improvement > 0}
        />

        <KpiCard
          title="Active Plan"
          value={user?.plan || "Free"}
        />
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

  {recent.length === 0 ? (

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

  ) : (

    <table className="w-full text-sm text-left">

      <thead className="bg-gray-50 text-gray-600">
        <tr>
          <th className="p-4">Role</th>
          {/* <th>Company</th> */}
          <th>Final</th>
          <th>AI</th>
          <th>Rule</th>
          <th>Date</th>
          <th></th>
        </tr>
      </thead>

      <tbody>

        {recent.map((i) => {

          const date = new Date(i.created_at);

          const formattedDate =
            date.toLocaleDateString("en-GB");

          return (

            <tr key={i.id} className="border-t border-gray-200">

          {/* ROLE + COMPANY */}
          <td className="p-4">
            {(() => {
              const jd = jdList.find(j => j.id === i.jd_id);

              return (
                <div className="flex flex-col">

                  <span className="font-medium text-gray-900">
                    {jd?.role || "Interview"}
                  </span>

                  <span className="text-xs text-gray-500">
                    {jd?.company_name || "—"}
                  </span>

                </div>
              );
            })()}
          </td>
          {/* <td>{i.company || "—"}</td> */}
          <td>{i.final_score || 0}%</td>
          <td>{i.ai_score || 0}%</td>
          <td>{i.rule_score || 0}%</td>

          <td className="text-gray-500">
            {formattedDate}
          </td>

          <td className="text-right">

            <Link
              to={`/reports/${i.id}`}
              className="px-4 py-2 rounded-xl bg-gray-900 text-white text-xs hover:bg-black transition"
            >
              View
            </Link>

          </td>

        </tr>

          );

        })}

      </tbody>

    </table>

  )}

</div>

      {/* ================= PERFORMANCE OVERVIEW ================= */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-sm border border-gray-200/50">

        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Performance Overview
        </h3>

        <div className="grid md:grid-cols-2 gap-8">

          <ProgressBar label="Communication" value={avgScore} />
          <ProgressBar label="Technical Skills" value={avgScore - 5} />
          <ProgressBar label="Problem Solving" value={avgScore + 3} />
          <ProgressBar label="Confidence" value={avgScore - 2} />

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

      <h3 className="text-sm text-gray-500 mb-2">
        {title}
      </h3>

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

      <p className="text-sm text-gray-500 mb-2">
        {label}
      </p>

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