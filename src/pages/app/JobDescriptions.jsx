import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function JobDescriptions() {
  const [jdText, setJdText] = useState("");
  const [savedJDs, setSavedJDs] = useState([]);
  const [error, setError] = useState("");

  const API_BASE = "http://127.0.0.1:8000/api/jd";
  const getToken = () => localStorage.getItem("access_token");

  const [role, setRole] = useState("BACKEND");
  const [expiryDate, setExpiryDate] = useState("");
  const [selectedJD, setSelectedJD] = useState(null);
  const [editingJD, setEditingJD] = useState(null);
  const [companyName, setCompanyName] = useState("");


  /* ================= DATE FORMAT DD MM YYYY ================= */
  const formatDate = (dateString) => {
  if (!dateString) return null;

  const d = new Date(dateString);

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${day}-${month}-${year}`;
};

  /* ================= FETCH JDs ================= */
  const fetchJDs = async () => {
    try {
      const res = await fetch(`${API_BASE}/`, {
        headers: {
          // Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          Authorization: `Bearer ${getToken()}`,
        },
      });

      const data = await res.json();

      const formatted = data.map((jd) => ({
        id: jd.id,
        role: jd.role,
        company: jd.company_name,
        expiry: formatDate(jd.expires_at),
        // ? new Date(jd.expires_at).toLocaleDateString()
        // : null,
        rawExpiry: jd.expires_at,
        content: jd.original_text,
        date: formatDate(jd.created_at),
      }));

      setSavedJDs(formatted);
    } catch (err) {
      console.error("Failed to fetch JDs", err);
    }
  };

  useEffect(() => {
    fetchJDs();
  }, []);

  

  /* ================= SAVE JD ================= */
  const handleSave = async () => {

    console.log("TOKEN:", getToken());

    if (!jdText.trim()) {
      setError("Job description cannot be empty.");
      return;
    }

    const url = editingJD
      ? `${API_BASE}/${editingJD.id}/update/`
      : `${API_BASE}/create/`;

    const method = editingJD ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          title: role + " JD",
          company_name: companyName,
          role: role,
          original_text: jdText,
          parsed_data: {},
          expires_at: expiryDate || null
        }),
      });

      const data = await res.json();
      console.log("CREATE RESPONSE:", data);

      if (!res.ok) {
        console.error(data);
        throw new Error("Failed to save JD");
      }

      setJdText("");
      setError("");
      setEditingJD(null);

      fetchJDs(); // refresh list
    } catch (err) {
      console.error(err);
      setError("Failed to save job description.");
    }
  };

  /* ================= EDIT JD ================= */
        const handleEdit = (jd) => {
          setEditingJD(jd);

          setJdText(jd.content);
          setRole(jd.role);
          setCompanyName(jd.company || "")
          setExpiryDate(jd.rawExpiry || "");

        };

  /* ================= DELETE JD ================= */
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_BASE}/${id}/delete/`, {
        method: "DELETE",
        headers: {
          // Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          Authorization: `Bearer ${getToken()}`,
        },
      });

      fetchJDs(); // refresh list
    } catch (err) {
      console.error("Delete failed", err);
    }
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

      {/* ================= JOB ROLE DROPDOWN ================= */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-3 rounded-xl border border-gray-200"
        >
          <option value="BACKEND">Backend Developer</option>
          <option value="FRONTEND">Frontend Developer</option>
          <option value="FULLSTACK">Fullstack Developer</option>
          <option value="DATA">Data Scientist</option>
          <option value="DEVOPS">DevOps Engineer</option>
          <option value="OTHER">Other</option>
        </select>

      {/* ================= COMPANY NAME ================= */}
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Company Name
        </label>

        <input
          type="text"
          placeholder="Example: Google"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="w-full p-3 rounded-xl border border-gray-200"
        />
      </div>


        {/* ================= EXPIRY DATE ================= */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Expiry Date
            </label>

            <input
              type="date"
              value={expiryDate}
              min={new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
              .toISOString()
              .split("T")[0]}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-200"
            />
          </div>


      {/* ================= JOB DESCRIPTION AREA ================= */}
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
            {editingJD ? "Update Job Description" : "Save Job Description"}
          </button>

          <label className="px-6 py-3 rounded-2xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition cursor-pointer">
            Upload File
            <input type="file" className="hidden" />
          </label>
        </div>
      </div>

      {/* ================= SAVED JDs ================= */}
      {/* <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-sm border border-gray-200/50">

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
                onClick={() => setSelectedJD(jd)}
                className="p-6 rounded-2xl border border-gray-200 bg-white hover:shadow-sm transition cursor-pointer"
              >
                <div className="flex justify-between items-start gap-6">
                  <div>
                    <p className="text-sm text-gray-400 mb-2">
                      Role: {jd.role} • Saved on {jd.date} • Expires: {jd.expiry || "N/A"}
                    </p>
                    <p className="text-gray-700 text-sm line-clamp-3">
                      {jd.content}
                    </p>
                  </div>

                  <div className="flex gap-4">

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(jd);
                    }}
                    className="text-sm text-blue-500 hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(jd.id);
                    }}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Delete
                  </button>

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div> */}

      <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-sm border border-gray-200/50">

      <table className="w-full text-sm">

      <thead className="border-b text-sm text-gray-700">
      <tr>
      <th className="text-left py-3">Role</th>
      <th className="text-left">Company</th>
      <th className="text-left">Created</th>
      <th className="text-left">Expiry</th>
      <th className="text-center">Actions</th>
      <th></th>
      </tr>
      </thead>

      <tbody>

      {savedJDs.map((jd) => (
      <tr
      key={jd.id}
      className="border-b hover:bg-gray-50 cursor-pointer"
      onClick={() => setSelectedJD(jd)}
      >

      <td className="py-4">{jd.role}</td>
      <td>{jd.company || "—"}</td>
      <td>{jd.date}</td>
      <td>{jd.expiry || "—"}</td>

      <td className="flex justify-center items-center gap-4 py-4">

        <button
        onClick={(e) => {
        e.stopPropagation();
        setSelectedJD(jd);
        }}
        className="text-gray-700 hover:underline"
        >
        View
        </button>

        <button
        onClick={(e) => {
        e.stopPropagation();
        handleEdit(jd);
        }}
        className="text-blue-500 hover:underline"
        >
        Edit
        </button>

        <button
        onClick={(e) => {
        e.stopPropagation();
        handleDelete(jd.id);
        }}
        className="text-red-500 hover:underline"
        >
        Delete
        </button>

        </td>

      </tr>
      ))}

      </tbody>

      </table>

      </div>


      {/* ================= JD PREVIEW ================= */}
      {selectedJD && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-3xl p-10 max-w-4xl w-full shadow-2xl">

              <h3 className="text-xl font-semibold mb-4">
                Job Description
              </h3>

              <p className="text-sm text-gray-400 mb-4">
                Role: {selectedJD.role}
              </p>

              <div className="max-h-[400px] overflow-y-auto text-sm text-gray-700 leading-relaxed space-y-4 whitespace-pre-line">

                {selectedJD.content.split("\n").map((line, index) => {

                  // Section titles
                  const isHeading =
                    line.includes("Job Overview") ||
                    line.includes("Key Responsibilities") ||
                    line.includes("Required Skills") ||
                    line.includes("Preferred Qualifications") ||
                    line.includes("Soft Skills") ||
                    line.includes("What We Offer");

                  if (isHeading) {
                    return (
                      <h4 key={index} className="font-semibold text-gray-900 mt-4">
                        {line}
                      </h4>
                    );
                  }

                  return <p key={index}>{line}</p>;
                })}

              </div>

              <button
                onClick={() => setSelectedJD(null)}
                className="mt-6 px-6 py-2 bg-gray-900 text-white rounded-xl"
              >
                Close
              </button>

            </div>

          </div>
        )}

    </div>
  );
}

export default JobDescriptions;