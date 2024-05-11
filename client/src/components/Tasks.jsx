import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { UserAuth } from '../context/AuthContext';
import Task from './Task';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faAdd,faFilter,faSignOut } from '@fortawesome/free-solid-svg-icons';
import {Link,useNavigate} from 'react-router-dom';

const Tasks = () => {
    const {user,logout}=UserAuth();
    const [tasks, setTasks] = useState([]);
    const [query, setQuery] = useState('');
    const [sortOrder,setSortOrder]=useState('');
    const [sortedTasks,setSortedTasks]=useState([]);
    const [showDropDown,setShowDropDown]=useState(false);
    const navigate=useNavigate();
    const apiurl=process.env.REACT_APP_BACKEND_API_URL;


    useEffect(() => {
      const fetchTasks = async () => {
        try {
            const res=await axios.get(`${apiurl}/tasks/`+user.uid.toString())
            console.log(res.data);
            setTasks(res.data);
        } catch (error) {
            console.log(error);
        }
      }

      const sortTasks=()=>{
        let sorted=[...tasks];
        
        if(sortOrder===''){
          return;
        }
        const mp={"Low":"1","Medium":"2","High":"3"};
        sorted.sort((a,b)=>{
          if(sortOrder==='Ascending Priority'){
            return mp[a.priority].localeCompare(mp[b.priority]);
          }
          else if(sortOrder==='Descending Priority'){
            return mp[b.priority].localeCompare(mp[a.priority]);
          }
          else if(sortOrder==='Ascending Due Date'){
            return a.dueDate.localeCompare(b.dueDate);
          }
          else if(sortOrder==='Descending Due Date'){
            return b.dueDate.localeCompare(a.dueDate);
          }
        });

        setSortedTasks(sorted);
      }
      fetchTasks();
      sortTasks();
    }, [sortOrder,tasks,user])

    const toggleDropDown = () =>{
      setShowDropDown(!showDropDown);
    }

    const handlePriorityChange = (e) => {
      setSortOrder(e.target.value);
      setShowDropDown(false);
    }

    const handleLogOut = async () => {
      try {
        await logout();
        navigate("/");
        console.log("User logged out!")
      } catch (error) {
        console.log(error)
      }
    }
    
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
          <div className="col-auto relative">
            <button className="btn btn-lg btn-success" onClick={toggleDropDown}>
              <FontAwesomeIcon icon={faFilter} />
            </button>
            {showDropDown && 
              <select onChange={handlePriorityChange} className="absolute top-0 form-control form-control-lg">
                <option value="">Select filter</option>
                <option value="Ascending Priority">Ascending Priority</option>
                <option value="Descending Priority">Descending Priority</option>
                <option value="Ascending Due Date">Ascending Due Date</option>
                <option value="Descending Due Date">Descending Due Date</option>
              </select>            
            }
            <button className="btn btn-lg btn-success mx-2">
              <Link className="custom-link" to="/add">
                <FontAwesomeIcon icon={faAdd} />
              </Link>
            </button>
            <button className="btn btn-lg btn-success" onClick={handleLogOut}>
              <FontAwesomeIcon icon={faSignOut}/>
            </button>
          </div>
        </div>
      </>

      {tasks && tasks.length ? "" : "No tasks found..."}

      
        {sortOrder==='' ? (
          <>
            {tasks.filter((task)=>task.text.toLowerCase().includes(query.toLowerCase())).map((task)=>(
              <Task task={task} key={task.id}/>
            ))}
          </>
        ):(
          <>
            {sortedTasks.filter((task)=>task.text.toLowerCase().includes(query.toLowerCase())).map((task)=>(
              <Task task={task} key={task.id}/>
            ))}
          </>
        )}
    </div>
  )
}

export default Tasks
