import React from 'react'
import NoteCreation from '../components/NoteCreation'
import NoteDeletion from '../components/NoteDeletion'


const Notes = () => {
  return (
    <div className='flex flex-col md:flex-row h-full justify-between'>
        <NoteCreation />
        <NoteDeletion />
    </div>
  )
}

export default Notes