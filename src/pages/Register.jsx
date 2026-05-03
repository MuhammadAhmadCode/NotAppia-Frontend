import axios from "axios";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({});

  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordLength = password.length >= 6;
  const isEmailValid = !email || validateEmail(email);
  const isFormValid = fullName && email && passwordLength && isEmailValid;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:3000/api/auth/user/register",
        { fullName, email, password },
        { withCredentials: true },
      );
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="grid md:grid-cols-2 gap-8 w-full max-w-6xl items-center">
        {/* Left side - Features */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden md:flex flex-col justify-center space-y-8"
        >
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Start taking notes professionally
            </h1>
            <p className="text-xl text-gray-600 mt-6 leading-relaxed">
              Join thousands of professionals organizing their thoughts with
              NotePro. Secure, fast, and beautifully designed.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                icon: "📝",
                title: "Smart Organization",
                desc: "Organize notes your way",
              },
              {
                icon: "🔒",
                title: "Enterprise Security",
                desc: "Your data is encrypted",
              },
              {
                icon: "⚡",
                title: "Lightning Fast",
                desc: "Instant sync across devices",
              },
              {
                icon: "🎯",
                title: "Distraction-Free",
                desc: "Focus on what matters",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start space-x-4"
              >
                <span className="text-3xl">{item.icon}</span>
                <div>
                  <p className="font-semibold text-gray-900">{item.title}</p>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right side - Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Create Account
            </h2>
            <p className="text-gray-600 mb-8">Join NotePro today, it's free</p>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-medium"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  onBlur={() => setTouched({ ...touched, name: true })}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition font-medium text-gray-900 bg-gray-50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched({ ...touched, email: true })}
                  placeholder="name@company.com"
                  className={`w-full px-4 py-3 border rounded-lg font-medium text-gray-900 placeholder-gray-500 transition ${
                    touched.email && !isEmailValid
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  } focus:outline-none focus:ring-2 bg-gray-50`}
                  required
                />
                {touched.email && !isEmailValid && (
                  <p className="text-red-600 text-sm mt-1">
                    Please enter a valid email
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setTouched({ ...touched, password: true })}
                  placeholder="At least 6 characters"
                  className={`w-full px-4 py-3 border rounded-lg font-medium text-gray-900 placeholder-gray-500 transition ${
                    touched.password && !passwordLength
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  } focus:outline-none focus:ring-2 bg-gray-50`}
                  required
                />
                {touched.password && !passwordLength && (
                  <p className="text-red-600 text-sm mt-1">
                    Password must be at least 6 characters
                  </p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={!isFormValid || loading}
                whileHover={{ scale: isFormValid && !loading ? 1.02 : 1 }}
                whileTap={{ scale: isFormValid && !loading ? 0.98 : 1 }}
                className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 mt-2"
              >
                {loading ? "Creating account..." : "Create Account"}
              </motion.button>
            </form>

            <p className="mt-6 text-center text-gray-700">
              Already have an account?{" "}
              <Link
                className="text-blue-600 font-semibold hover:text-blue-700 transition"
                to="/user/login"
              >
                Sign in
              </Link>
            </p>
          </div>

          <p className="text-center text-gray-600 text-sm mt-6">
            By creating an account, you agree to our{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Terms of Service
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
