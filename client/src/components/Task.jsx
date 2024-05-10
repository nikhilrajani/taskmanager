import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Task = ({task}) => {
  const handleDelete = async () =>{
    try {
      await axios.delete("http://localhost:8800/tasks/"+task.id);
      window.location.reload();
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h2 className="font-bold">Title: {task.text}</h2>
      <p>Priority: {task.priority}</p>
      <p>Due: {task.dueDate}</p>

      <button>
        <Link to={`/update/${task.id}`}>
          Update
        </Link>
      </button>
      <button onClick={()=>handleDelete()}>
        Delete
      </button>
    </div>
  )
}

export default Task
