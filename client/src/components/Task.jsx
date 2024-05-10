import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faCircleCheck, faPen, faTrashCan,faCircleXmark
} from '@fortawesome/free-solid-svg-icons'

const Task = ({task}) => {
  const [isCompleted,setIsCompleted]=useState(false);
  const handleDelete = async () =>{
    try {
      await axios.delete("http://localhost:8800/tasks/"+task.id);
      // window.location.reload();
    } catch (error) {
      console.log(error)
    }
  }

  const handleToggle = () => {
    setIsCompleted(!isCompleted);
  }

  return (
    <React.Fragment key={task.id}>
      <div className="col taskBg">
          <div className={isCompleted ? "done":""}>
            <span className="taskText">{task.text}</span>
          </div>
          <div className="iconsWrap">
            {isCompleted ? (
                <span
                  onClick={handleToggle}
                >
                  <FontAwesomeIcon icon={faCircleXmark} />
                </span>
              ):(
                <span
                  onClick={handleToggle}
                >
                  <FontAwesomeIcon icon={faCircleCheck} />
                </span>
              )}
            {isCompleted ? null : (
              <span>
                <Link className="custom-link" to={`/update/${task.id}`}>
                  <FontAwesomeIcon icon={faPen} />
                </Link>
              </span>
            )}
            <span
              onClick={()=>handleDelete()}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </span>
          </div>
            <div>
                <span className="taskText">Priority: {task.priority}</span>
                <span className="taskText">Deadline: {task.dueDate}</span>
            </div>
        </div>
    </React.Fragment>
  )
}

export default Task
