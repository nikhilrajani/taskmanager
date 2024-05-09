import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { UserAuth } from '../context/AuthContext';
import Task from './Task';

const Tasks = () => {
    const {user}=UserAuth();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
      const fetchTasks = async () => {
        try {
            const res=await axios.get("http://localhost:8800/tasks/"+user.uid.toString())
            console.log(res.data);
            setTasks(res.data);
        } catch (error) {
            console.log(error);
        }
      }
      fetchTasks();
    }, [user])
    
  return (
    <div>
      {tasks && tasks.map((task)=>(
        <Task task={task} key={task.id} />
      ))}
    </div>
  )
}

export default Tasks
