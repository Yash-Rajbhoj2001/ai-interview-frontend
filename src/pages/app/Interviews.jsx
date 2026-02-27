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

  /* ================= TIMER ================= */
  useEffect(() => {
    if (!active) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [active]);

  const formatTime = () => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  /* ================= START INTERVIEW ================= */
  const startInterview = () => {
    setStarted(true);
    setActive(true);
    setSeconds(0);

    setMessages([
      {
        role: "ai",
        content: "Welcome. Let's begin your mock interview."
      }
    ]);
  };

  /* ================= SEND MESSAGE ================= */
  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      content: input
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    simulateAIResponse();
  };

  /* ================= FAKE AI RESPONSE ================= */
  const simulateAIResponse = () => {
    setIsTyping(true);

    setTimeout(() => {
      const aiMessage = {
        role: "ai",
        content:
          "Thank you for your response. Can you elaborate on the challenges you faced?"
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const endInterview = () => {
  setActive(false);
  setGenerating(true);

  // Fake report generation delay
  setTimeout(() => {
    setGenerating(false);
    setCompleted(true);
  }, 2500);
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
            Job Role: Backend Developer
          </p>
        </div>

        {started && (
          <div className="text-sm text-gray-600">
            Duration: <span className="font-medium">{formatTime()}</span>
          </div>
        )}
      </div>

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
                  onClick={handleSend}
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