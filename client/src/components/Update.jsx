import React, { useEffect, useState,useRef } from 'react'
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { UserAuth } from '../context/AuthContext';

const Update = () => {
    const [task, setTask] = useState({
        text:"",
        priority:"",
        dueDate:"",
    });

    const [currTask,setCurrTask]=useState({});

    const {user}=UserAuth();
    const navi=useNavigate();
    const location=useLocation();
    const taskId=location.pathname.split("/")[2];
    const ref=useRef();

    useEffect(() => {
      const fetchTask = async () =>{
        try {
            const res=await axios.get("http://localhost:8800/tasks/"+user.uid.toString()+"/"+taskId.toString())
            // console.log(taskId)
            // console.log(currTask.text);
            // console.log(res.data);
            setCurrTask(res.data[0]);
            setTask(res.data[0]);
            // console.log(currTask.text);
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
            await axios.put("http://localhost:8800/tasks/"+taskId  ,task);
            navi("/tasks");
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className="form">
        <h1 className="font-bold">Update task</h1>
        <div className="row py-2">
            <div className="col">
            <input 
                placeholder={currTask.text}
                type="text"
                name="text"
                onChange={handleChange}
                className="form-control form-control-lg"
                value={task.text}
            />
            </div>
        </div>
        <div className="row py-2">
            <div className="col">
            <input 
                placeholder={currTask.priority}
                type="text"
                name="priority"
                onChange={handleChange}
                className="form-control form-control-lg"
                value={task.priority}
            />
            </div>
            <div className='col'>
            <input
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

export default Update