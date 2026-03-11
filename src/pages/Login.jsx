import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const {setUser } = useContext(AuthContext)

  const handleLogin = async(e) => {
    e.preventDefault();
    console.log("Login attempted with:", { email, password });
    // Here you can call your login API
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/user/login",
        { email,password},
        { withCredentials: true }
      )
      console.log(res)
      setUser(res.data)
      navigate("/")
    } catch (err) {
      console.error(err)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-gray-700 text-white shadow-lg rounded-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div>
            <label className="block mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center">
          Don't have an account?{" "}
          <a href="/user/register" className="text-indigo-600 font-medium hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;