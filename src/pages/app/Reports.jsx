import { useState } from "react";
import { Link } from "react-router-dom";

function Reports() {

  // -----------------------------
  // Mock Data (Replace with API)
  // -----------------------------
  const reports = [
    {
      id: "1",
      role: "Backend Developer",
      final_score: 82,
      ai_score: 84,
      rule_score: 79,
      duration: "18 mins",
      date: "27 Feb 2026",
    },
    {
      id: "2",
      role: "Frontend Developer",
      final_score: 76,
      ai_score: 80,
      rule_score: 72,
      duration: "22 mins",
      date: "20 Feb 2026",
    },
  ];

  // -----------------------------
  // KPI Calculations
  // -----------------------------
  const totalInterviews = reports.length;
  const avgScore =
    reports.reduce((acc, r) => acc + r.final_score, 0) /
    reports.length;

  const bestScore = Math.max(...reports.map((r) => r.final_score));

  return (
    <div className="max-w-7xl mx-auto space-y-10">

      {/* ================= KPI SECTION ================= */}
      <div className="grid md:grid-cols-3 gap-6">

        <KPI title="Total Interviews" value={totalInterviews} />

        <KPI title="Average Score" value={`${avgScore.toFixed(1)}%`} />

        <KPI title="Best Score" value={`${bestScore}%`} />

      </div>

      {/* ================= REPORT TABLE ================= */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-gray-200/50 overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            Interview Reports
          </h2>
        </div>

        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-6">Role</th>
              <th>Final</th>
              <th>AI</th>
              <th>Rule</th>
              <th>Duration</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className="border-t border-gray-200">
                <td className="p-6 font-medium text-gray-900">
                  {report.role}
                </td>
                <td>{report.final_score}%</td>
                <td>{report.ai_score}%</td>
                <td>{report.rule_score}%</td>
                <td>{report.duration}</td>
                <td className="text-gray-500">{report.date}</td>
                <td className="pr-6 text-right">
                  <Link
                    to={`/reports/${report.id}`}
                    className="px-4 py-2 rounded-xl bg-gray-900 text-white hover:bg-black transition"
                  >
                    View Full Report
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= START NEW INTERVIEW ================= */}
      <div className="flex justify-center">
        <Link
          to="/interviews"
          className="px-8 py-3 rounded-2xl bg-gray-900 text-white hover:bg-black transition"
        >
          Start New Interview Session
        </Link>
      </div>
    </div>
  );
}

function KPI({ title, value }) {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 text-center">
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-3xl font-bold text-gray-900 mt-2">
        {value}
      </h3>
    </div>
  );
}

export default Reports;