import { useParams, Link } from "react-router-dom";

function ReportDetail() {
  const { id } = useParams();

  // -----------------------------
  // Mock Data (Replace with API)
  // -----------------------------
  const report = {
    role: "Backend Developer",
    session_id: id,
    date: "27 Feb 2026",
    duration: "18 mins",
    final_score: 82,
    ai_score: 84,
    rule_score: 79,
    technical: 85,
    communication: 78,
    relevance: 80,
    confidence: 83,
    problem_solving: 75,
    summary:
      "Candidate demonstrates strong backend knowledge. Needs deeper scalability analysis.",
    strengths: [
      "Strong database fundamentals",
      "Logical structuring",
      "Clear explanation style",
    ],
    improvements: [
      "Add more metrics",
      "Improve confidence under pressure",
      "Explain trade-offs deeply",
    ],
    transcript: [
      {
        question: "Explain database indexing.",
        candidate:
          "Indexing improves performance using B-tree structures.",
        ai_evaluation:
          "Strong conceptual clarity but missing complexity discussion.",
        ai_score: 85,
        rule_score: 75,
      },
      {
        question: "How would you scale a REST API?",
        candidate:
          "Using load balancers and horizontal scaling.",
        ai_evaluation:
          "Good answer but lacked caching depth explanation.",
        ai_score: 80,
        rule_score: 70,
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10">

      {/* ================= OVERVIEW ================= */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-10 border border-gray-200/50">
        <h2 className="text-3xl font-semibold text-gray-900">
          {report.role} Interview Report
        </h2>
        <p className="text-gray-500 mt-2">
          Session: {report.session_id} • {report.date} • {report.duration}
        </p>
      </div>

      {/* ================= MULTI FACTOR SCORE ================= */}
      <ScoreTable report={report} />

      {/* ================= AI SUMMARY ================= */}
      <Card title="AI Performance Summary">
        {report.summary}
      </Card>

      {/* ================= TRANSCRIPT ================= */}
      <Card title="Interview Transcript">
        {report.transcript.map((item, index) => {
          const weighted =
            (item.ai_score * 0.6 + item.rule_score * 0.4).toFixed(1);

          return (
            <div key={index} className="border-b border-gray-200 pb-6 mb-6">

              <p className="font-semibold text-gray-900">
                Q{index + 1}: {item.question}
              </p>

              <p className="mt-2 text-gray-600">
                <strong>Candidate:</strong> {item.candidate}
              </p>

              <p className="mt-2 text-gray-600">
                <strong>AI Evaluation:</strong> {item.ai_evaluation}
              </p>

              <div className="mt-4 bg-gray-50 p-4 rounded-xl">
                <p className="text-sm text-gray-700">
                  AI Score: {item.ai_score}%
                </p>
                <p className="text-sm text-gray-700">
                  Rule Score: {item.rule_score}%
                </p>
                <p className="text-sm font-medium text-gray-900">
                  Final Weighted Score: {weighted}%
                </p>
              </div>

            </div>
          );
        })}
      </Card>

      {/* ================= STRENGTH & IMPROVEMENT ================= */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card title="Strengths">
          <ul className="space-y-2">
            {report.strengths.map((s, i) => (
              <li key={i}>• {s}</li>
            ))}
          </ul>
        </Card>

        <Card title="Areas to Improve">
          <ul className="space-y-2">
            {report.improvements.map((s, i) => (
              <li key={i}>• {s}</li>
            ))}
          </ul>
        </Card>
      </div>

      {/* ================= SUMMARY TABLE ================= */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-gray-200/50 p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Report Summary
        </h3>

        <table className="w-full text-sm">
          <tbody>
            <tr>
              <td>Final Score</td>
              <td>{report.final_score}%</td>
            </tr>
            <tr>
              <td>AI Score</td>
              <td>{report.ai_score}%</td>
            </tr>
            <tr>
              <td>Rule Score</td>
              <td>{report.rule_score}%</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ================= DOWNLOAD ================= */}
      <div className="flex justify-center">
        <button className="px-8 py-3 rounded-2xl bg-gray-900 text-white hover:bg-black transition">
          Download Full Report
        </button>
      </div>

      <div className="flex justify-center">
        <Link
          to="/interviews"
          className="text-sm text-gray-600 hover:text-black"
        >
          Start New Interview Session
        </Link>
      </div>

    </div>
  );
}

function ScoreTable({ report }) {
  const items = [
    ["Technical", report.technical],
    ["Communication", report.communication],
    ["Relevance", report.relevance],
    ["Confidence", report.confidence],
    ["Problem Solving", report.problem_solving],
  ];

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-gray-200/50 p-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Scoring Breakdown
      </h3>

      <table className="w-full text-sm">
        <tbody>
          {items.map(([label, value], i) => (
            <tr key={i} className="border-b border-gray-200">
              <td className="py-3">{label}</td>
              <td>{value}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {title}
      </h3>
      <div className="text-gray-600 text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
}

export default ReportDetail;