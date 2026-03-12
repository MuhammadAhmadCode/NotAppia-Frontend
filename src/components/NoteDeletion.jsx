import React, { useContext, useState } from 'react'
import NoteContext from '../context/NoteContext'
import axios from 'axios'
import { motion } from 'motion/react'
import { BiEdit, BiSave } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { FcCancel } from 'react-icons/fc'




const NoteDeletion = () => {
    const { notes, setTitle, setDesc } = useContext(NoteContext)
    const [editId, setEditId] = useState(null)
    const [updatedtitle, setUpdatedTitle] = useState("")
    const [updateddescription, setUpdatedDescription] = useState("")


    const handleDelete = async (id) => {
        const c = confirm("Do you Really Wanna Delete the note")
        if (c) {
            await axios.delete(`http://localhost:3000/api/notes/deletenote/${id}`, { withCredentials: true })
        }
    }
    
    const handleEdit = async (id) => {
        const note = notes.filter((note) => note._id == id)
        setUpdatedDescription(note[0].description)
        setUpdatedTitle(note[0].title)
        setEditId(id)
    }
    
    const handleSave = async(id)=>{
        await axios.patch(`http://localhost:3000/api/notes/updatenote/${id}`,{updatedtitle,updateddescription}, { withCredentials: true })
        setEditId(null)
    }

    const handleCancel = () => {
        setEditId(null)
        setUpdatedTitle("")
        setUpdatedDescription("")
    }

    return (
        <div className='md:w-1/2 w-full p-4 flex flex-wrap overflow-y-auto gap-5 h-full border-l-4  justify-center border-l-black'>
            {notes.length === 0 && <div className='text-white p-9 text-xl text-center'>No Notes To Display</div>}

            {notes.map((note) => {
                return (
                    <motion.div
                        whileHover={{
                            scale: 1.06
                        }}
                        drag
                        dragConstraints={{ left: 0, top: 0, right: 0, bottom: 0 }}
                        whileDrag={{ scale: 1.09 }}
                        key={note._id} className='flex rounded-xl overflow-hidden text-white w-45 h-fit p-6 justify-between bg-[#8686863e] items-center flex-col gap-6 border-2 border-black drop-shadow-lg drop-shadow-gray-900'>
                        {editId !== note._id && <h2 className='text-xl font-semibold '>{note.title}</h2>}
                        {editId !== note._id && <p className='text-sm'>{note.description}</p>}

                        {editId == note._id && <input
                            className='border-2 px-2 rounded-2xl w-[98%] border-white'
                            value={updatedtitle}
                            onChange={(e) => setUpdatedTitle(e.target.value)}
                            type="text"
                            placeholder='Enter Updated Task'
                        />}

                        {editId == note._id && <textarea
                            className='border-2 py-10 px-2 rounded-2xl w-[99%] border-white' value={updateddescription} placeholder='Enter Updated Description' onChange={(e) => setUpdatedDescription(e.target.value)} name="textare">
                        </textarea>}

                        <div className='flex gap-4'>
                            <motion.button whileHover={{ scale: 1.06 }} onClick={() => handleDelete(note._id)} className='py-1 bg-red-700 px-4 rounded-xl cursor-pointer'><AiFillDelete /></motion.button>
                            {editId !== note._id && <motion.button whileHover={{ scale: 1.06 }} onClick={() => handleEdit(note._id)} className='py-1 bg-red-700 px-4 rounded-xl cursor-pointer'><BiEdit /></motion.button>}
                            {editId == note._id && <motion.button disabled={updateddescription.trim().length<4 && updatedtitle.trim().length<4} whileHover={{ scale: 1.06 }} onClick={() => handleSave(note._id)} className='py-1 bg-red-700 px-2 rounded-xl cursor-pointer'><BiSave /></motion.button>}
                            {editId == note._id && <motion.button whileHover={{ scale: 1.06 }} onClick={() => handleCancel(note._id)} className='py-1 bg-red-700 px-2 text-white rounded-xl cursor-pointer'><FcCancel /></motion.button>}
                        </div>
                    </motion.div>
                )
            })}
        </div>
    )
}

export default NoteDeletion