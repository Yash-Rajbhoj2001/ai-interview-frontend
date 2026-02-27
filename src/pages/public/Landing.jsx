import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";



function Landing() {
    const navigate = useNavigate();

                    /* ================================
                    ✅ SCROLL TO TOP ON REFRESH
                ================================= */
                useEffect(() => {
                    window.scrollTo(0, 0);
                }, []);

                /* ================================
                    ✅ NAVBAR SCROLL EFFECT
                ================================= */
                const [scrolled, setScrolled] = useState(false);

                useEffect(() => {
                    const handleScroll = () => {
                    setScrolled(window.scrollY > 40);
                    };

                    window.addEventListener("scroll", handleScroll);
                    return () => window.removeEventListener("scroll", handleScroll);
                }, []);
    

            {/* ===== INTERVIEW PREVIEW CARD TYPED EFFECT===== */}

            const aiText = "Teell me about a challenging project you worked on.";
            const candidateText = "I I led a backend optimization project that improved performance by 40%.";

            const [typedAI, setTypedAI] = useState("");
            const [typedCandidate, setTypedCandidate] = useState("");
            const [phase, setPhase] = useState("ai"); 
            const [resetKey, setResetKey] = useState(0);
            const [startTyping, setStartTyping] = useState(false);

            useEffect(() => {
                if (!startTyping) return;
            setTypedAI("");
            setTypedCandidate("");
            setPhase("ai");

            let aiIndex = 0;

            const aiInterval = setInterval(() => {
                if (aiIndex >= aiText.length) {
                    clearInterval(aiInterval);

                    setTimeout(() => {
                    setPhase("thinking");

                    setTimeout(() => {
                        setPhase("candidate");

                        let cIndex = 0;

                        const candidateInterval = setInterval(() => {
                        if (cIndex >= candidateText.length) {
                            clearInterval(candidateInterval);
                            setPhase("done");
                            return;
                        }

                        setTypedCandidate((prev) => prev + candidateText.charAt(cIndex));
                        cIndex++;
                        }, Math.random() * 40 + 20);

                   }, 2000);

                }, 800);

                return;
            }

            setTypedAI((prev) => prev + aiText.charAt(aiIndex));
            aiIndex++;

            }, 25);

            return () => clearInterval(aiInterval);

            }, [startTyping]);

            return (

                 /* ================================
                    ✅ SCROLL SNAP CONTAINER ADDED
                    ================================= */
                    <div className="relative overflow-hidden bg-white h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">

                    {/* Floating Background Glow */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ duration: 1.2 }}
                    className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-indigo-200/40 rounded-full blur-3xl"
                    style={{ animation: "float 10s ease-in-out infinite" }}
                />

                {/* ================= NAVBAR ================= */}
                <header
                    className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
                    scrolled
                        ? "bg-white/90 backdrop-blur-xl shadow-md border-b border-gray-200"
                        : "bg-white/70 backdrop-blur-xl border-b border-gray-100"
                    }`}
                >
                    <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="text-lg font-semibold tracking-tight">
                        AI.<span className="text-primary"> Interview</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link to="/login" 
                        className="text-sm text-gray-600 hover:text-gray-900 transition">
                        Login
                        </Link>

                        <Link to="/signup" 
                        className="px-5 py-2 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-black transition">
                        Sign Up
                        </Link>
                    </div>
                    </div>
                </header>

                {/* ================= HERO SECTION ================= */}
                <section className="snap-start relative min-h-screen flex flex-col justify-center items-center text-center px-6 pt-32 pb-40 transition-all duration-700 ease-out">

                    <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ amount: 0.3 }}
                    className="mt-6 text-6xl md:text-8xl font-bold tracking-tight text-gray-900 leading-[1.1] max-w-7xl"
                    >
                    Practice Interviews with AI.
                    <br />
                    <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent animate-gradient">
                        Get Real Feedback. Improve Faster.
                    </span>
                    </motion.h1>

                    <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="mt-6 text-lg text-gray-500 max-w-2xl"
                    >
                    Upload a job description. Take a live AI interview.
                    Get detailed scoring and actionable insights instantly.
                    </motion.p>

                    <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="mt-10 flex gap-4"
                    >
                    <Link to="/signup" className="px-8 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-medium shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-300">
                        Start Practicing
                    </Link>

                    <button className="px-8 py-3 rounded-2xl bg-white/70 backdrop-blur-xl border border-gray-200 text-gray-700 font-medium hover:bg-white transition-all duration-300">
                        See Demo
                    </button>
                    </motion.div>
                    {/* ✅ GRADIENT DIVIDER ADDED */}
                    <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-white pointer-events-none"></div>

            </section>

            {/* ================= INTERVIEW PREVIEW SECTION ================= */}
            <section className="snap-start relative min-h-screen flex flex-col justify-center items-center text-center px-6 transition-all duration-700 ease-out">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: 0.4 }}
                    transition={{ duration: 0.7 }}
                    className="text-center max-w-8xl mx-auto"
                >
                    <div className="mt-4 inline-flex items-center px-4 py-2.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-medium border border-indigo-100">
                    AI-Powered Mock Interview
                    </div>

                    <h2 className="mt-6 text-5xl md:text-8xl font-bold tracking-tight text-gray-900">
                    Experience a Real Interview Simulation
                    </h2>

                    <p className="mt-4 text-gray-500">
                    Live conversation. Structured evaluation.
                    Actionable feedback in seconds.
                    </p>
                </motion.div>

                    {/* ===== INTERVIEW PREVIEW CARD ===== */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ amount: 0.4 }}
                        onViewportEnter={() => setStartTyping(true)}
                        onViewportLeave={() => {
                            setStartTyping(false);
                            setTypedAI("");
                            setTypedCandidate("");
                            setPhase("ai");
                        }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="mt-20 w-full max-w-5xl mx-auto"
                        >
                        <div className="perspective-container">
                            <div className="preview-card relative bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-10 shadow-2xl overflow-hidden min-h-[220px] transition-all duration-500">

                            {/* AI Message */}
                            {typedAI && (
                                <div className="flex justify-start mb-6">
                                <div className="bg-indigo-50 text-gray-800 px-7 py-4 rounded-2xl text-sm max-w-sm shadow-sm">
                                    {typedAI}
                                    {phase === "ai" && (
                                    <span className="ml-1 animate-pulse">|</span>
                                    )}
                                </div>
                                </div>
                            )}

                            {/* Thinking Dots */}
                            {phase === "thinking" && (
                                <div className="flex justify-end mb-6">
                                <div className="bg-white border border-gray-200 text-gray-400 px-5 py-3 rounded-2xl text-sm shadow-sm flex gap-1">
                                    <span className="opacity-40 animate-pulse">•</span>
                                    <span className="opacity-60 animate-pulse delay-150">•</span>
                                    <span className="opacity-80 animate-pulse delay-300">•</span>
                                </div>
                                </div>
                            )}

                            {/* Candidate Message */}
                            {typedCandidate && (
                                <div className="flex justify-end">
                                <div className="bg-white border border-gray-200 text-gray-700 px-7 py-4 rounded-2xl text-sm max-w-sm shadow-sm">
                                    {typedCandidate}
                                    {phase === "candidate" && (
                                    <span className="ml-1 animate-pulse">|</span>
                                    )}
                                </div>
                                </div>
                            )}

                            </div>
                        </div>
                        </motion.div>
                        {/* ✅ GRADIENT DIVIDER ADDED */}
                        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-white pointer-events-none"></div>

                </section>


            {/* ================= PREMIUM PRICING SECTION ================= */}
            <section className="snap-start relative min-h-screen flex flex-col justify-center py-32 px-6 bg-white overflow-hidden transition-all duration-700 ease-out">

            {/* Soft Background Depth Layer */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-50/40 to-transparent pointer-events-none" />

            <div className="relative max-w-7xl mx-auto text-center">

                <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ amount: 0.3 }}
                className="text-8xl font-bold tracking-tight text-gray-900"
                >
                Simple & Transparent Pricing
                </motion.h2>

                <p className="mt-6 text-lg text-gray-500">
                Invest in your preparation. Improve faster.
                </p>

                <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.3 }}
                variants={{
                    hidden: {},
                    visible: {
                    transition: {
                        staggerChildren: 0.15
                    }
                    }
                }}
                className="grid md:grid-cols-4 gap-12 mt-9"
                >

                {/* FREE */}
                <motion.div
                    variants={{
                    hidden: { opacity: 0, y: 60 },
                    visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.8 }}
                    className="group relative bg-white border border-gray-200 rounded-3xl p-10 shadow-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_40px_80px_rgba(0,0,0,0.12)]"
                >
                    <h3 className="text-xl font-semibold">Free</h3>
                    <p className="text-5xl font-bold mt-8">₹0</p>

                    <ul className="mt-10 space-y-4 text-sm text-gray-500">
                    <li>1 Interview</li>
                    <li>Basic AI Scoring</li>
                    <li>Transcript Access</li>
                    </ul>

                    <Link to="/signup">
                    <button className="mt-28 w-full py-3 rounded-2xl bg-gray-900 text-white font-medium transition-all duration-300 hover:bg-black hover:scale-[1.02]">
                    
                    Get Started
                    
                    </button>
                    </Link>
                </motion.div>


                {/* SINGLE */}
                <motion.div
                    variants={{
                    hidden: { opacity: 0, y: 60 },
                    visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.8 }}
                    className="group relative bg-white border border-gray-200 rounded-3xl p-10 shadow-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_40px_80px_rgba(0,0,0,0.12)]"
                >
                    <h3 className="text-xl font-semibold">Single</h3>
                    <p className="text-5xl font-bold mt-8">₹99</p>

                    <ul className="mt-10 space-y-4 text-sm text-gray-500">
                    <li>1 Detailed Interview</li>
                    <li>Full Feedback Report</li>
                    <li>Downloadable Transcript</li>
                    </ul>

                    <button 
                    onClick={() => navigate("/payment/single")}
                    className="mt-28 w-full py-3 rounded-2xl bg-gray-900 text-white font-medium transition-all duration-300 hover:bg-black hover:scale-[1.02]">
                    Buy Now
                    </button>
                </motion.div>


                {/* PRO */}
                <motion.div
                    variants={{
                    hidden: { opacity: 0, y: 60 },
                    visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.8 }}
                    className="relative group rounded-3xl p-10 text-white shadow-2xl scale-105 overflow-hidden transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_60px_100px_rgba(79,70,229,0.35)]
                    bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.25),transparent_40%),linear-gradient(135deg,#6366f1,#4f46e5)]"
                >
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 bg-white text-indigo-600 text-xs px-5 py-1 rounded-full font-semibold shadow">
                    Most Popular
                    </div>

                    <h3 className="text-xl font-semibold mt-0">Pro</h3>
                    <p className="text-5xl font-bold mt-8">₹499/mo</p>

                    <ul className="mt-10 space-y-4 text-sm text-indigo-100">
                    <li>10 Interviews / month</li>
                    <li>Advanced AI Feedback</li>
                    <li>Performance Analytics</li>
                    <li>Priority Processing</li>
                    </ul>

                    <button
                     onClick={() => navigate("/payment/pro")} 
                    className="mt-20 w-full py-3 rounded-2xl bg-white text-indigo-600 font-semibold transition-all duration-300 hover:scale-[1.03]">
                    Upgrade
                    </button>
                </motion.div>


                {/* PREMIUM */}
                <motion.div
                    variants={{
                    hidden: { opacity: 0, y: 60 },
                    visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.8 }}
                    className="group relative rounded-3xl p-10 text-white shadow-2xl overflow-hidden transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_60px_120px_rgba(0,0,0,0.5)]
                    bg-gradient-to-br from-gray-900 via-black to-gray-950"
                >
                    <h3 className="text-xl font-semibold">Premium</h3>
                    <p className="text-5xl font-bold mt-8">₹999/mo</p>

                    <ul className="mt-10 space-y-4 text-sm text-gray-300">
                    <li>Unlimited Interviews</li>
                    <li>Deep AI Evaluation</li>
                    <li>Video + Voice Analysis</li>
                    <li>Custom Skill Reports</li>
                    <li>Priority Support</li>
                    </ul>

                    <button 
                     onClick={() => navigate("/payment/premium")}
                    className="mt-12 w-full py-3 rounded-2xl bg-white text-black font-semibold transition-all duration-300 hover:bg-gray-200 hover:scale-[1.03]">
                    Go Premium
                    </button>
                </motion.div>

                </motion.div>
            </div>
        </section>

        {/* ================= FOOTER (UNCHANGED) ================= */}  

        <footer className="snap-start bg-gray-50 border-t border-gray-200 mt-32">
                <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10 text-sm text-gray-500">

                    <div>
                    <div className="text-gray-900 font-semibold mb-4">AI.<span className="text-primary"> Interview</span></div>
                    <p>
                        Practice smarter. Improve faster. 
                        Prepare with confidence.
                    </p>
                    </div>

                    <div>
                    <div className="text-gray-900 font-medium mb-4">Product</div>
                    <ul className="space-y-2">
                        <li>Mock Interviews</li>
                        <li>Pricing</li>
                        <li>Features</li>
                    </ul>
                    </div>

                    <div>
                    <div className="text-gray-900 font-medium mb-4">Company</div>
                    <ul className="space-y-2">
                        <li>About</li>
                        <li>Contact</li>
                        <li>Privacy Policy</li>
                    </ul>
                    </div>

                    <div>
                    <div className="text-gray-900 font-medium mb-4">Support</div>
                    <ul className="space-y-2">
                        <li>Help Center</li>
                        <li>Terms</li>
                        <li>Email Support</li>
                    </ul>
                    </div>

                </div>

                <div className="text-center text-xs text-gray-400 pb-6">
                    © {new Date().getFullYear()} AI. Interview. All rights reserved.
                </div>
                </footer>

    </div>
  );
}

export default Landing;