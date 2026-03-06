import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Interviews() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [active, setActive] = useState(false); // 👈 changed default
  const [started, setStarted] = useState(false); // 👈 new state
  const [completed, setCompleted] = useState(false);
  const [generating, setGenerating] = useState(false);

  const [jdList, setJdList] = useState([]);
  const [selectedJD, setSelectedJD] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const [interviewType, setInterviewType] = useState("Technical");
  const [role, setRole] = useState("BACKEND");
  

  const API_BASE = "http://127.0.0.1:8000/api/interviews";
  // const getToken = () => localStorage.getItem("access_token");
  const getToken = () => {
    return localStorage.getItem("access_token") || "";
  };

  /* ================= TIMER ================= */
    useEffect(() => {

      if (!getToken()) {
        navigate("/login");
        return;
      }

    if (!active) return;

    const timer = setInterval(() => {

      setSeconds((prev) => {

        const limit = 300; // FREE PLAN 5 MIN

        if (prev >= limit) {
          endInterview();
          return prev;
        }

        return prev + 1;

      });

    }, 1000);

    return () => clearInterval(timer);

  }, [active]);

  /* ================= FETCH JD ================= */
    useEffect(() => {

    const fetchJDs = async () => {

      try {

        const res = await fetch("http://127.0.0.1:8000/api/jd/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
          }
        });

        const data = await res.json();

        if (!res.ok) {
          console.error(data);
          return;
        }

        if (!res.ok) {
          console.error("API error:", data);
          return;
        }

        setJdList(data);

      } catch (err) {
        console.error("Failed to load JDs", err);
      }

    };

    fetchJDs();

  }, []);

  /* ================= START INTERVIEW ================= */
  const startInterview = async () => {

  const token = localStorage.getItem("access_token");
  console.log("TOKEN:", token);

  if (!selectedJD) {
    alert("Please select a Job Description");
    return;
  }

  try {

    const res = await fetch(
      "http://127.0.0.1:8000/api/interviews/start/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${localStorage.getItem("access_token")}`
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          jd_id: selectedJD,
          interview_type: interviewType
        })
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error(data);
      return;
    }

    if (!res.ok) {
      console.error("API error:", data);
      return;
    }

    setSessionId(data.session_id);

    setStarted(true);
    setActive(true);
    setSeconds(0);

    fetchQuestion(data.session_id);

  } catch (err) {
    console.error("Start interview failed", err);
  }

};

  /* ================= FETCH QUESTIONS ================= */
  const fetchQuestion = async (session) => {

    try {

      const res = await fetch(
        `${API_BASE}/${session}/question/`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.error(data);
        return;
      }

      if (!res.ok) {
        console.error("API error:", data);
        return;
      }

      setCurrentQuestionId(data.question_id);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: data.question
        }
      ]);

    } catch (err) {
      console.error("Failed to fetch question", err);
    }

  };

  /* ================= SEND MESSAGE ================= */
  const handleSend = async () => {

    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      content: input
    };

    setMessages((prev) => [...prev, userMessage]);

    const answerText = input;

    setInput("");
    setIsTyping(true);

    try {

      const res = await fetch(
        `${API_BASE}/${sessionId}/answer/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`
          },
          body: JSON.stringify({
            question_id: currentQuestionId,
            answer: answerText
          })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.error(data);
        return;
      }

      if (!res.ok) {
        console.error("API error:", data);
        return;
      }

      setIsTyping(false);

      if (data.next_question) {
      setCurrentQuestionId(data.question_id);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: data.next_question
        }
      ]);
    }

      if (!data.next_question) {
        endInterview();
        return;
      }

    } catch (err) {
      console.error("Answer submission failed", err);
    }

  };

  /* ================= FAKE AI RESPONSE ================= */
  // const simulateAIResponse = () => {
  //   setIsTyping(true);

  //   setTimeout(() => {
  //     const aiMessage = {
  //       role: "ai",
  //       content:
  //         "Thank you for your response. Can you elaborate on the challenges you faced?"
  //     };

  //     setMessages((prev) => [...prev, aiMessage]);
  //     setIsTyping(false);
  //   }, 2000);
  // };

    /* ================= END INTERVIEW ================= */
    // const endInterview = async () => {

    //   setActive(false);
    //   setGenerating(true);

    //   try {

    //     const res = await fetch(
    //       `${API_BASE}/${sessionId}/report/`,
    //       {
    //         headers: {
    //           Authorization: `Bearer ${getToken()}`
    //         }
    //       }
    //     );

    //     await res.json();

    //     setTimeout(() => {
    //       setGenerating(false);
    //       setCompleted(true);
    //     }, 1500);

    //   } catch (err) {
    //     console.error("Report generation failed", err);
    //   }

    // };

      const endInterview = async () => {

        if (!sessionId) {
          console.error("Session ID missing");
          return;
        }

        setActive(false);
        setGenerating(true);

        try {

          console.log("Generating report for:", sessionId);

          const res = await fetch(
            `${API_BASE}/${sessionId}/report/`,
            {
              headers: {
                Authorization: `Bearer ${getToken()}`
              }
            }
          );

          if (!res.ok) {
            throw new Error("Report API failed");
          }

          const data = await res.json();

          console.log("Report generated:", data);

          setTimeout(() => {
            setGenerating(false);
            setCompleted(true);
          }, 1500);

        } catch (err) {

          console.error("Report generation failed:", err);

          setGenerating(false);

        }

      };


  const formatTime = () => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};    
  return (
    <div className="max-w-7xl mx-auto space-y-8">

      {/* ================= HEADER ================= */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-sm border border-gray-200/50 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Mock Interview Session
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Job Role: {role}
          </p>
        </div>

        {started && (
          <div className="text-sm text-gray-600">
            Duration: <span className="font-medium">{formatTime()}</span>
          </div>
        )}
      </div>


      {/* ================= SELECT JD & INTERVIEW TYPE ================= */}
      {!started && (
      <div className="space-y-4 ">

        {/* SELECT JD */}

        <select
          value={selectedJD}
          onChange={(e) => {
            const jdId = e.target.value;

            setSelectedJD(jdId);

            const selected = jdList.find(jd => jd.id == jdId);

            if (selected) {
              setRole(selected.role);
            }
          }}
          className="w-full p-3 rounded-xl border border-gray-200"
        >

          <option value="">Select Job Description</option>

          {jdList.map((jd) => (
            <option key={jd.id} value={jd.id}>
              {jd.role} • {jd.company_name || "Company"}
            </option>
          ))}

        </select>


        {/* INTERVIEW TYPE */}

        <select
          value={interviewType}
          onChange={(e) => setInterviewType(e.target.value)}
          className="w-full p-3 rounded-xl border border-gray-200"
        >

          <option value="Technical">Technical Interview</option>
          <option value="HR">HR Interview</option>
          <option value="Mixed">Mixed Interview</option>

        </select>

      </div>
      )}

      {/* ================= IF NOT STARTED ================= */}
      {!started && (

        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-16 shadow-sm border border-gray-200/50 text-center space-y-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Ready to begin your mock interview?
          </h3>
          <p className="text-gray-500 text-sm">
            Make sure you're prepared and distraction-free.
          </p>

          <button
            onClick={startInterview}
            className="px-8 py-3 rounded-2xl bg-gray-900 text-white hover:bg-black transition"
          >
            Start Interview
          </button>
        </div>
      )}

      {/* ================= MAIN INTERVIEW LAYOUT ================= */}
      {started && !generating && !completed && (
        <div className="grid md:grid-cols-3 gap-8">

          {/* ================= CHAT AREA ================= */}
          <div className="md:col-span-2 bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-gray-200/50 flex flex-col h-[600px]">

            <div className="flex-1 overflow-y-auto space-y-4 pr-2">

              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.role === "ai" ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`px-5 py-3 rounded-2xl text-sm max-w-md ${
                      msg.role === "ai"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-gray-900 text-white"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="px-5 py-3 rounded-2xl text-sm bg-gray-100 text-gray-500 animate-pulse">
                    AI is typing...
                  </div>
                </div>
              )}

            </div>

            {/* ================= INPUT AREA ================= */}
            {active && (
              <div className="mt-4 flex gap-4">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your answer..."
                  className="flex-1 px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
                />

                <button
                  onClick={handleSend} disabled={isTyping}
                  className="px-6 py-3 rounded-2xl bg-gray-900 text-white hover:bg-black transition"
                >
                  Send
                </button>
              </div>
            )}

          </div>

          {/* ================= SIDE PANEL ================= */}
          <div className="space-y-6">

            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-gray-200/50">
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Live Feedback
              </h3>
              <p className="text-gray-400 text-sm">
                Real-time evaluation will appear here.
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-gray-200/50">
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Confidence Score
              </h3>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-gray-900 h-3 rounded-full w-[70%]"></div>
              </div>
            </div>

            {active && (
              <button
                onClick={endInterview}
                className="w-full py-3 rounded-2xl bg-red-500 text-white hover:bg-red-600 transition"
              >
                End Interview
              </button>
            )}

          </div>
        </div>
      )}

      {/* ================= GENERATING STATE ================= */}
{generating && (
  <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-16 shadow-sm border border-gray-200/50 text-center space-y-6 mt-8">
    <div className="w-12 h-12 mx-auto border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>

    <h3 className="text-xl font-semibold text-gray-900">
      Generating Your Report...
    </h3>

    <p className="text-gray-500 text-sm">
      Analyzing responses, confidence, and technical depth.
    </p>
  </div>
)}

{/* ================= COMPLETED STATE ================= */}
{completed && (
  <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-12 shadow-sm border border-gray-200/50 text-center space-y-6 mt-8">
    
    <h3 className="text-2xl font-semibold text-gray-900">
      Interview Completed 🎉
    </h3>

    <p className="text-gray-500 text-sm">
      Great job! Your performance report is ready.
    </p>

    <div className="flex justify-center gap-4 mt-6">
      <Link
        to="/reports"
        className="px-6 py-3 rounded-2xl bg-gray-900 text-white hover:bg-black transition inline-block hover:scale-[1.03] transition-all duration-300"
      >
        View Full Report
      </Link>


      <button
        onClick={() => {
          setStarted(false);
          setCompleted(false);
          setMessages([]);
          setSeconds(0);
        }}
        className="px-6 py-3 rounded-2xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
      >
        Start New Interview
      </button>
    </div>

  </div>
)}

    </div>
  );
}

export default Interviews;