import { motion } from "framer-motion";
import { useState } from "react";

function JobDescriptions() {
  const [jdText, setJdText] = useState("");
  const [savedJDs, setSavedJDs] = useState([]);
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!jdText.trim()) {
      setError("Job description cannot be empty.");
      return;
    }

    const newJD = {
      id: Date.now(),
      content: jdText,
      date: new Date().toLocaleDateString(),
    };

    setSavedJDs([newJD, ...savedJDs]);
    setJdText("");
    setError("");
  };

  const handleDelete = (id) => {
    setSavedJDs(savedJDs.filter((jd) => jd.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10">

      {/* ================= HEADER ================= */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/70 backdrop-blur-xl rounded-3xl p-10 shadow-sm border border-gray-200/50"
      >
        <h2 className="text-3xl font-semibold tracking-tight text-gray-900 mb-2">
          Job Descriptions
        </h2>
        <p className="text-gray-500">
          Add or upload a job description to start practicing interviews.
        </p>
      </motion.div>

      {/* ================= ADD JD SECTION ================= */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-sm border border-gray-200/50 space-y-6">

        <h3 className="text-lg font-semibold text-gray-900">
          Add New Job Description
        </h3>

        <textarea
          value={jdText}
          onChange={(e) => {
            setJdText(e.target.value);
            setError("");
          }}
          rows="6"
          placeholder="Paste the job description here..."
          className="w-full p-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 transition resize-none"
        />

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <div className="flex gap-4">
          <button
            onClick={handleSave}
            className="px-6 py-3 rounded-2xl bg-gray-900 text-white font-medium hover:bg-black transition"
          >
            Save Job Description
          </button>

          <label className="px-6 py-3 rounded-2xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition cursor-pointer">
            Upload File
            <input type="file" className="hidden" />
          </label>
        </div>
      </div>

      {/* ================= SAVED JDs ================= */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-sm border border-gray-200/50">

        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Saved Job Descriptions
        </h3>

        {savedJDs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm">
              No job descriptions saved yet.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {savedJDs.map((jd) => (
              <div
                key={jd.id}
                className="p-6 rounded-2xl border border-gray-200 bg-white hover:shadow-sm transition"
              >
                <div className="flex justify-between items-start gap-6">
                  <div>
                    <p className="text-sm text-gray-400 mb-2">
                      Saved on {jd.date}
                    </p>
                    <p className="text-gray-700 text-sm line-clamp-3">
                      {jd.content}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDelete(jd.id)}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

export default JobDescriptions;