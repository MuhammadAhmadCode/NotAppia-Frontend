import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            NoteApp
          </h1>
        </div>
        <p className="text-gray-400 text-sm">
          Organize your thoughts effortlessly
        </p>
      </div>
    </nav>
  );
};

export default Navbar;
