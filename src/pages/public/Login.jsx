import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Navbar scroll effect
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ================= STATES =================
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Demo credentials
  const DEMO_EMAIL = "demo@ai.com";
  const DEMO_PASSWORD = "Demo@123";

  const validate = () => {
    let errors = {};

    if (!email) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      errors.email = "Enter a valid email address.";
    }

    if (!password) {
      errors.password = "Password is required.";
    } else if (!passwordRegex.test(password)) {
      errors.password =
        "6+ characters, 1 capital, 1 number & 1 special character required.";
    }

    return errors;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      return;
    }

    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      localStorage.setItem("auth", "true");
      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  const isFormValid =
    email &&
    password &&
    emailRegex.test(email) &&
    passwordRegex.test(password);

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">

      {/* Background Glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-indigo-200/40 rounded-full blur-3xl" />

      {/* Navbar */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-md border-b border-gray-200"
            : "bg-white/70 backdrop-blur-xl border-b border-gray-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-lg font-semibold tracking-tight">
            <div
              onClick={() => {
                navigate("/");
                window.scrollTo(0, 0);
              }}
              className="text-lg font-semibold tracking-tight cursor-pointer"
            >
              AI.<span className="text-primary"> Interview</span>
            </div>
          </div>
        </div>
      </header>

      {/* Center Card */}
      <div className="flex items-center justify-center min-h-screen px-6 pt-32">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl p-10 shadow-2xl"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome Back
          </h2>

          <p className="mt-2 text-gray-500 text-sm">
            Sign in to continue your interview practice.
          </p>
          <p className="mt-2 text-gray-500 text-sm">
            Demo login: demo@ai.com / Demo@123
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-6">

            {/* Email */}
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setFieldErrors({});
                  setError("");
                }}
                className={`mt-2 w-full px-4 py-3 rounded-xl border transition
                  ${
                    fieldErrors.email
                      ? "border-red-400 focus:ring-red-400"
                      : "border-gray-200 focus:ring-indigo-500"
                  }
                  focus:outline-none focus:ring-2`}
              />

              {fieldErrors.email && (
                <p className="mt-2 text-xs text-red-500">
                  {fieldErrors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-600">Password</label>

              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setFieldErrors({});
                    setError("");
                  }}
                  className={`w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  ${
    fieldErrors.password
      ? "border-red-400 focus:ring-red-400"
      : "border-gray-200 focus:ring-indigo-500"
  }
  focus:outline-none focus:ring-2`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700 transition"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {fieldErrors.password && (
                <p className="mt-2 text-xs text-red-500">
                  {fieldErrors.password}
                </p>
              )}
            </div>

            {/* General Error */}
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button
              type="submit"
              // disabled={!isFormValid}
              className={`w-full py-3 rounded-xl font-medium transition-all duration-300 ${
                isFormValid
                  ? "bg-gray-900 text-white hover:bg-black"
                  : "bg-gray-900 text-white hover:bg-black"
              }`}
            >
              Login
            </button>

          </form>

          <p className="mt-6 text-sm text-gray-500 text-center">
            Don’t have an account?{" "}
            <Link to="/signup">
              <span className="text-indigo-600 cursor-pointer hover:underline">
                Sign Up
              </span>
            </Link>
          </p>

        </motion.div>
      </div>

    </div>
  );
}

export default Login;