import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { UserAuth } from '../context/AuthContext';
import Task from './Task';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faAdd,faFilter } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';

const Tasks = () => {
    const {user}=UserAuth();
    const [tasks, setTasks] = useState([]);
    const [query, setQuery] = useState('');

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
      <>
        <div className="row py-4">
          <div className="col">
            <input 
              placeholder="Search"
              type="text"
              onChange={(e)=>setQuery(e.target.value)}
              className="form-control form-control-lg"
            />
          </div>
          <div className="col-auto">
            <button className="btn btn-lg btn-success mx-2">
              <FontAwesomeIcon icon={faFilter} />
            </button>
            <button className="btn btn-lg btn-success">
              <Link className="custom-link" to="/add">
                <FontAwesomeIcon icon={faAdd} />
              </Link>
            </button>
          </div>
        </div>
      </>

      {tasks && tasks.length ? "" : "No tasks found..."}

      <>
        {tasks.filter((task)=>task.text.toLowerCase().includes(query.toLowerCase())).map((task)=>(
          <Task task={task} key={task.id}/>
        ))}
      </>
    </div>
  )
}

export default Tasks
