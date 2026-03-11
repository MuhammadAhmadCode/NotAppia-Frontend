import React, { useContext, useState } from 'react'
import NoteContext from '../context/NoteContext'
import axios from 'axios'



const NoteDeletion = () => {
    const { notes } = useContext(NoteContext)


    const handleDelete = async (id) => {
        const c = confirm("Do you Really Wanna Delete the note")
        if (c) {
            await axios.delete(`http://localhost:3000/api/notes/deletenote/${id}`, { withCredentials: true })
        }
    }

    return (
        <div className='md:w-1/2 w-full p-4 flex flex-wrap overflow-y-auto gap-5 h-full border-l-4  justify-center border-l-black'>
            {notes.length === 0 && <div className='text-white p-9 text-xl text-center'>No Notes To Display</div>}

            {notes.map((note) => {
                return (
                    <div key={note._id} className='flex rounded-xl overflow-hidden text-white w-45 h-fit p-6 justify-between bg-[#8686863e] items-center flex-col gap-6 border-2 border-black drop-shadow-lg drop-shadow-gray-900'>
                        <h2 className='text-xl font-semibold '>{note.title}</h2>
                        <p className='text-sm'>{note.description}</p>
                        <button onClick={() => handleDelete(note._id)} className='py-1 bg-red-700 px-9 rounded-xl cursor-pointer'>Delete</button>
                    </div>
                )
            })}
        </div>
    )
}

export default NoteDeletion