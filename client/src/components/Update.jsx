import React, { useEffect, useState } from 'react'
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { UserAuth } from '../context/AuthContext';

const Update = () => {
    const [task, setTask] = useState({
        text:"",
        priority:"",
        dueDate:"",
    });

    const {user}=UserAuth();
    const navi=useNavigate();
    const location=useLocation();
    const taskId=location.pathname.split("/")[2];

    useEffect(() => {
      const fetchTask = async () =>{
        try {
            const res=await axios.get("http://localhost:8800/tasks/"+user.uid.toString()+"/"+taskId.toString())
            console.log(res.data);
            // console.log(taskId)
            // setTask(res.data);
        } catch (error) {
            console.log(error);
        }
      }

      fetchTask();
    }, [])
    

    const handleChange = (e) => {
        setTask(prev=>({...prev,[e.target.name]:e.target.value}));
    }

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            const res=await axios.put("http://localhost:8800/tasks/"+taskId  ,task);
            // console.log(res);
            navi("/tasks");
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className="form">
        <h1>Update Task</h1>
        <input type="text" placeholder="text" onChange={handleChange} name="text"/>
        <input type="select" placeholder="priority" onChange={handleChange} name="priority"/>
        <input type="date" placeholder="dueDate" onChange={handleChange} name="dueDate"/>

        <button onClick={handleClick}>Update</button>
    </div>
  )
}

export default Update