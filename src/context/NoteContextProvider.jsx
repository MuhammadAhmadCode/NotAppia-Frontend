import React, { useState, useEffect, useContext } from 'react'
import NoteContext from './NoteContext'
import api from '../api/axios'
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
        const res = await api.get("/notes/allnotes");
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