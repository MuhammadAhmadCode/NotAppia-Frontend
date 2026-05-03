import React from "react";
import NoteCreation from "../components/NoteCreation";
import NoteDeletion from "../components/NoteDeletion";
import Navbar from "../components/Navbar";

const Notes = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] gap-6 p-6">
        <div className="flex-1 min-h-0">
          <NoteCreation />
        </div>
        <div className="flex-1 min-h-0">
          <NoteDeletion />
        </div>
      </div>
    </div>
  );
};

export default Notes;
