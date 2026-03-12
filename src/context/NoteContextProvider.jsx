import React, { useState, useEffect, useContext } from 'react'
import NoteContext from './NoteContext'
import axios from 'axios'
import { AuthContext } from './AuthContext'


const NoteContextProvider = ({ children }) => {
  const [notes, setNotes] = useState([])
  const { user} = useContext(AuthContext)
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")



  useEffect(() => {
    if (!user) return;
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/notes/allnotes", {
          withCredentials: true,
        });
        setNotes(res.data.notes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchNotes();
  }, [user,notes]);
  return (
    <NoteContext.Provider value={{ notes, setNotes,title,desc,setTitle,setDesc}}>
      {children}
    </NoteContext.Provider>
  )
}

export default NoteContextProvider