import React, { useContext, useState } from "react";
import NoteContext from "../context/NoteContext";
import axios from "axios";
import { motion } from "motion/react";
import { BiEdit, BiSave } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { MdClose } from "react-icons/md";

const NoteDeletion = () => {
  const { notes } = useContext(NoteContext);
  const [editId, setEditId] = useState(null);
  const [updatedtitle, setUpdatedTitle] = useState("");
  const [updateddescription, setUpdatedDescription] = useState("");

  const handleDelete = async (id) => {
    if (window.confirm("Delete this note?")) {
      try {
        await axios.delete(`http://localhost:3000/api/notes/deletenote/${id}`, {
          withCredentials: true,
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleEdit = (id) => {
    const note = notes.find((n) => n._id === id);
    setUpdatedDescription(note.description);
    setUpdatedTitle(note.title);
    setEditId(id);
  };

  const handleSave = async (id) => {
    try {
      await axios.patch(
        `http://localhost:3000/api/notes/updatenote/${id}`,
        { updatedtitle, updateddescription },
        { withCredentials: true },
      );
      setEditId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setUpdatedTitle("");
    setUpdatedDescription("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-slate-800 rounded-2xl p-6 border border-slate-700 h-full flex flex-col overflow-hidden"
    >
      <h2 className="text-2xl font-bold text-white mb-4">Your Notes</h2>

      {notes.length === 0 ? (
        <div className="flex items-center justify-center flex-1 text-gray-400 text-center">
          <p className="text-lg">No notes yet. Create your first note!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 overflow-y-auto flex-1 pr-2">
          {notes.map((note) => {
            const isEditing = editId === note._id;
            return (
              <motion.div
                key={note._id}
                layout
                whileHover={!isEditing ? { scale: 1.02 } : {}}
                className="bg-slate-700 border border-slate-600 rounded-xl p-4 text-white transition-all hover:border-slate-500"
              >
                {!isEditing ? (
                  <>
                    <h3 className="text-lg font-semibold mb-2 wrap-break-word line-clamp-2">
                      {note.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4 wrap-break-word line-clamp-3">
                      {note.description}
                    </p>
                    <div className="flex gap-2 justify-between">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleEdit(note._id)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer transition"
                      >
                        <BiEdit size={18} /> Edit
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDelete(note._id)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-red-600 hover:bg-red-700 rounded-lg cursor-pointer transition"
                      >
                        <AiFillDelete size={18} /> Delete
                      </motion.button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-3">
                    <input
                      className="w-full px-3 py-2 bg-slate-600 border border-slate-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                      value={updatedtitle}
                      onChange={(e) => setUpdatedTitle(e.target.value)}
                      type="text"
                      placeholder="Note title"
                    />
                    <textarea
                      className="w-full px-3 py-2 bg-slate-600 border border-slate-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition resize-none"
                      value={updateddescription}
                      placeholder="Note description"
                      onChange={(e) => setUpdatedDescription(e.target.value)}
                      rows="3"
                    />
                    <div className="flex gap-2 justify-end">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={
                          updateddescription.trim().length < 4 ||
                          updatedtitle.trim().length < 4
                        }
                        onClick={() => handleSave(note._id)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-green-600 hover:bg-green-700 disabled:bg-gray-500 rounded-lg cursor-pointer transition"
                      >
                        <BiSave size={18} /> Save
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={() => handleCancel()}
                        className="flex items-center gap-2 px-3 py-1.5 bg-gray-600 hover:bg-gray-700 rounded-lg cursor-pointer transition"
                      >
                        <MdClose size={18} /> Cancel
                      </motion.button>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};

export default NoteDeletion;
