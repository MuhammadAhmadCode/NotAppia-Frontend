import axios from 'axios'
import React,{useContext, useState} from 'react'
import NoteContext from '../context/NoteContext'

const NoteCreation = () => {
  const {title,setTitle,setDesc,desc} = useContext(NoteContext)

    const handleSubmit = async (e) => {
        e.preventDefault()
    
        await axios.post("http://localhost:3000/api/notes/create-note",
           { title: title, description: desc},
           {withCredentials:true}

        )
    
        setTitle("")
        setDesc("")
      }

  return (
    <form onSubmit={handleSubmit} className='md:w-1/2 flex text-white  flex-col gap-10 py-6 px-9  w-full bg-blue-900  h-full'>
          <h1 className='text-4xl text-center font-bold'>Add Notes</h1>
          <input
            className='border-2 rounded-2xl py-2 px-4 border-white'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder='Enter Your Task'
          />
          <textarea
            className='border-2 py-10 rounded-2xl px-3 border-white' value={desc} placeholder='Enter Your Description' onChange={(e) => setDesc(e.target.value)} name="textare">

          </textarea>
          <button disabled={title.trim().length < 4 || desc.trim().length < 5} className='border-2 disabled:bg-gray-300 p-3 cursor-pointer text-black bg-white rounded-2xl text-xl font-semibold border-black'>Add</button>
        </form>
  )
}

export default NoteCreation