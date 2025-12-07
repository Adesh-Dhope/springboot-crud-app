import React, { useState } from 'react'
import TeacherForm from './TeacherForm'
import UserForm from './UserForm'
import Notes from './Notes'

const Dashboard = () => {

  const [teacherActive, setTeacherActive] = useState(true)
  const [studentActive, setStudentActive] = useState(false)
  const [notesActive, setNotesActive] = useState(false)
  return (
    <div className="w-full p-2">
      <div className="flex gap-2 justify-start p-1 rounded-lg w-full">

        <div
          onClick={() => {
            setTeacherActive(true);
            setStudentActive(false);
            setNotesActive(false)
          }}
          className={`w-1/5 border
         text-center py-1 rounded-md font-medium cursor-pointer 
        
        ${teacherActive
              ? "bg-orange-500 text-white scale-105"
              : "text-black hover:bg-orange-200"}
      `}
        >
          Add Teacher
        </div>

        <div
          onClick={() => {
            setStudentActive(true);
            setTeacherActive(false);
            setNotesActive(false);
          }}
          className={`border
        w-1/5 text-center py-1 rounded-md font-medium cursor-pointer 
        ${studentActive
              ? "bg-orange-500 text-white  scale-105"
              : "text-black hover:bg-orange-200"}
      `}
        >
          Add Student
        </div>
        <div
          onClick={() => {
            setStudentActive(false);
            setTeacherActive(false);
            setNotesActive(true)
          }}
          className={`border
        w-1/5 text-center py-1 rounded-md font-medium cursor-pointer 
        ${notesActive
              ? "bg-orange-500 text-white  scale-105"
              : "text-black hover:bg-orange-200"}
      `}
        >
          Add Notes
        </div>
      </div>

      {/* Render Components */}
      <div className="mt-4 w-full">
        {teacherActive && <TeacherForm />}
        {studentActive && <UserForm />}
        {notesActive && <Notes />}
      </div>
    </div>


  )
}

export default Dashboard
