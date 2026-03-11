import axios from 'axios'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/user/register",
        { fullName, email, password },
        { withCredentials: true }
      )
      console.log(response)
      navigate("/")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
      <motion.form
        onSubmit={handleSubmit}
        whileHover={{ scale: 1.02 }}
        className="bg-slate-700 shadow-lg rounded-2xl md:w-1/3 w-full max-w-md p-8 flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-white text-center mb-4">Register</h2>

        <div className="flex flex-col gap-2">
          <label className="text-white font-medium">Full Name</label>
          <input
          
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Your Full Name"
            type="text"
            className="px-4 text-white py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-white font-medium">Email</label>
          <input
          
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            type="email"
            className="px-4 text-white py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-white font-medium">Password</label>
          <input
          
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your Password"
            type="password"
            className="px-4 text-white py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-4 cursor-pointer bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-xl font-semibold transition-all"
        >
          Register
        </button>
        <p className="mt-6 text-center text-gray-200">
          Already Have an accound?{" "}
          <a href="/user/login" className="text-indigo-400 font-medium hover:underline">
            Sign In
          </a>
        </p>
      </motion.form>
    </div>
  )
}

export default Register