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
      <h1 className="font-bold">Add new task</h1>
      <div className="row py-2">
        <div className="col">
          <input 
            placeholder="Enter the task"
            type="text"
            name="text"
            onChange={handleChange}
            className="form-control form-control-lg"
          />
        </div>
      </div>
      <div className="row py-2">
        <div className="col">
          <input 
            placeholder="Priority"
            type="text"
            name="priority"
            onChange={handleChange}
            className="form-control form-control-lg"
          />
        </div>
        <div className='col'>
          <input
            placeholder="Due Date"
            type="date" 
            name="dueDate"
            onChange={handleChange}
            className="form-control form-control-lg"
          />
        </div>
      </div>
      <div className="py-2">
        <button type='submit' onClick={handleClick} className="btn btn-lg btn-success">Submit</button>
      </div>
    </div>
  )
}

export default Add
