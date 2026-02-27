import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Signup() {

  // =========================
  // STATES
  // =========================
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // ✅ NEW STATES (added)
  const [fieldErrors, setFieldErrors] = useState({});
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Password rule:
  // 6+ characters, 1 uppercase, 1 number, 1 special character
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;

  // ✅ NEW VALIDATION FUNCTION (added)
  const validate = () => {
    let errors = {};

    if (!fullName.trim()) {
      errors.fullName = "Full name is required.";
    }

    if (!email.trim()) {
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

  const handleSignup = (e) => {
    e.preventDefault();

    // ✅ NEW VALIDATION CALL
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      return;
    }

    if (!passwordRegex.test(password)) {
      setError(
        "Password must be 6+ characters, include 1 capital, 1 number & 1 special character."
      );
      return;
    }

    setError("");
    alert("Signup successful (Demo only)");
  };

  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ NEW: Form validity check (added)
  const isFormValid =
    fullName &&
    email &&
    password &&
    emailRegex.test(email) &&
    passwordRegex.test(password);

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">

      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-indigo-200/40 rounded-full blur-3xl" />

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
        </div>
      </header>

      <div className="flex items-center justify-center min-h-screen px-6 pt-32">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl p-10 shadow-2xl"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Create Account
          </h2>

          <p className="mt-2 text-gray-500 text-sm">
            Start practicing interviews today.
          </p>

          <form onSubmit={handleSignup} className="mt-8 space-y-6">

            {/* Full Name */}
            <div>
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  setFieldErrors({});
                  setError("");
                }}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition ${
                  fieldErrors.fullName
                    ? "border-red-400 focus:ring-red-400"
                    : "border-gray-200 focus:ring-indigo-500"
                }`}
              />
              {fieldErrors.fullName && (
                <p className="mt-2 text-xs text-red-500">
                  {fieldErrors.fullName}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setFieldErrors({});
                  setError("");
                }}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition ${
                  fieldErrors.email
                    ? "border-red-400 focus:ring-red-400"
                    : "border-gray-200 focus:ring-indigo-500"
                }`}
              />
              {fieldErrors.email && (
                <p className="mt-2 text-xs text-red-500">
                  {fieldErrors.email}
                </p>
              )}
            </div>

            {/* Password with Show/Hide */}
            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setFieldErrors({});
                    setError("");
                  }}
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition ${
                    fieldErrors.password
                      ? "border-red-400 focus:ring-red-400"
                      : "border-gray-200 focus:ring-indigo-500"
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700 transition"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {/* Live Validation */}
              {password && !passwordRegex.test(password) && (
                <p className="mt-2 text-xs text-red-500">
                  Password must contain 6+ characters, 1 capital, 1 number & 1 special character.
                </p>
              )}

              {fieldErrors.password && (
                <p className="mt-2 text-xs text-red-500">
                  {fieldErrors.password}
                </p>
              )}
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button
              type="submit"
              // disabled={!isFormValid}
              className={`w-full py-3 rounded-xl font-medium transition-all duration-300
                ${
                isFormValid
                  ? "bg-gray-900 text-white hover:bg-black"
                  : "bg-gray-900 text-white hover:bg-black"
              }`}
            >
              Sign Up
            </button>

          </form>

          {/* Already have account */}
          <p className="mt-6 text-sm text-gray-500 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Login
            </Link>
          </p>

        </motion.div>
      </div>

    </div>
  );
}

export default Signup;