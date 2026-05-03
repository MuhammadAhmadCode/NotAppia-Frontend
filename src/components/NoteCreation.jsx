import api from "../api/axios";
import React, { useContext, useState } from "react";
import NoteContext from "../context/NoteContext";
import { motion } from "motion/react";
import { AuthContext } from "../context/AuthContext";

const NoteCreation = () => {
  const { title, setTitle, setDesc, desc } = useContext(NoteContext);
  const { setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/notes/create-note", {
        title: title,
        description: desc,
      });
      setTitle("");
      setDesc("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogOut = async () => {
    try {
      await api.get("/auth/user/logout");
      setUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col gap-6 bg-slate-800 rounded-2xl p-6 border border-slate-700 h-full overflow-y-auto"
    >
      <div className="flex gap-4 justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Create Note</h2>
        <motion.button
          type="button"
          onClick={handleLogOut}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-red-600 hover:bg-red-700 cursor-pointer px-4 py-2 rounded-lg text-white font-semibold transition-all"
        >
          Log Out
        </motion.button>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-gray-300">
          Task Title
        </label>
        <motion.input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Enter task title..."
          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
        />
      </div>

      <div className="flex-1 flex flex-col">
        <label className="block text-sm font-medium mb-2 text-gray-300">
          Description
        </label>
        <textarea
          value={desc}
          placeholder="Enter detailed description..."
          onChange={(e) => setDesc(e.target.value)}
          className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none"
        />
      </div>

      <motion.button
        type="submit"
        whileHover={!loading && { scale: 1.02 }}
        whileTap={!loading && { scale: 0.98 }}
        disabled={title.trim().length < 4 || desc.trim().length < 5 || loading}
        className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold rounded-lg transition-all duration-200 cursor-pointer"
      >
        {loading ? "Adding..." : "Add Note"}
      </motion.button>
    </motion.form>
  );
};

export default NoteCreation;
