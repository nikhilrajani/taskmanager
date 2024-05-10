import React, { useState } from 'react'
import axios from 'axios';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const [task,setTask]=useState({
    text:"",
    priority:"",
    dueDate:"",
    user_uid:""
  })
  const {user}=UserAuth();
  const navigate=useNavigate();

  const handleChange = (e) =>{
    setTask(prev=>({...prev,[e.target.name]:e.target.value}));
    setTask(prev=>({...prev,user_uid:user.uid.toString()}));
  }

  const handleClick = async (e) =>{
    e.preventDefault();
    try {
      const res=await axios.post("http://localhost:8800/tasks",task);
      console.log('Task Added Succesfully!')
      navigate("/tasks");
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div>
      <h1 className="font-bold">Add new book</h1>
      <input type="text" placeholder="Task..." onChange={handleChange} name="text"/>
      <input type="text" placeholder="Priority..." onChange={handleChange} name="priority"/>
      <input type="date" placeholder="Due Date..." onChange={handleChange} name="dueDate"/>
      <button type='submit' onClick={handleClick}>Submit</button>
    </div>
  )
}

export default Add
