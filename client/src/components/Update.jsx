import React, { useState } from 'react'
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';

const Update = () => {
    const [task, setTask] = useState({
        description:"",
        priority:"",
        dueDate:"",
    });

    const navi=useNavigate();
    const location=useLocation();
    const taskId=location.pathname.split("/")[2];

    const handleChange = (e) => {
        setTask(prev=>({...prev,[e.target.name]:e.target.value}));
    }

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            await axios.put("http://localhost:8800/tasks/"+taskId  ,task);
            navi("/");
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className="form">
        <h1>Update Task</h1>
        <input type="text" placeholder="description" onChange={handleChange} name="description"/>
        <input type="select" placeholder="priority" onChange={handleChange} name="priority" />
        <input type="date" placeholder="dueDate" onChange={handleChange} name="dueDate"/>

        <button onClick={handleClick}>Update</button>
    </div>
  )
}

export default Update