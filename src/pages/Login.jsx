import api from "../api/axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isEmailValid = !email || validateEmail(email);
  const isFormValid = email && password && isEmailValid;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/user/login", { email, password });
      setUser(res.data);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="grid md:grid-cols-2 gap-8 w-full max-w-6xl items-center">
        {/* Left side - Branding */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden md:flex flex-col justify-center space-y-8"
        >
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Welcome to <span className="text-blue-600">NotePro</span>
            </h1>
            <p className="text-xl text-gray-600 mt-6 leading-relaxed">
              The premium note-taking platform designed for professionals and
              teams who demand excellence.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { icon: "✓", text: "Secure cloud storage" },
              { icon: "✓", text: "Real-time synchronization" },
              { icon: "✓", text: "Advanced search & organization" },
              { icon: "✓", text: "Enterprise-grade security" },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center space-x-3 text-gray-700"
              >
                <span className="text-blue-600 font-bold text-lg">
                  {feature.icon}
                </span>
                <span className="font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right side - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
            <p className="text-gray-600 mb-8">Continue to your workspace</p>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-medium"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
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
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-semibold text-gray-900">
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Forgot?
                  </a>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition font-medium text-gray-900 bg-gray-50"
                  required
                />
              </div>

              <motion.button
                type="submit"
                disabled={!isFormValid || loading}
                whileHover={{ scale: isFormValid && !loading ? 1.02 : 1 }}
                whileTap={{ scale: isFormValid && !loading ? 0.98 : 1 }}
                className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 mt-2"
              >
                {loading ? "Signing in..." : "Sign In"}
              </motion.button>
            </form>

            <p className="mt-6 text-center text-gray-700">
              New to NotePro?{" "}
              <Link
                to="/user/register"
                className="text-blue-600 font-semibold hover:text-blue-700 transition"
              >
                Create account
              </Link>
            </p>
          </div>

          <p className="text-center text-gray-600 text-sm mt-6">
            By signing in, you agree to our{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Terms of Service
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
