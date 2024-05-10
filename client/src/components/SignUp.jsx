import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();

  const {createUser}=UserAuth();

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      await createUser(email,password);
      console.log("New User Signed Up Successfully!")
      navigate("/tasks")
    } catch (error) {
      console.log(error);
    }

    //TODO:post user to mysql db
  }

  return (
    <div className='taskBg w-[600px] flex flex-col justify-center items-center'>
      <div className='row py-2'>
        <h1 className="">Create a new Account</h1>
      </div>
      <div className='row'>
        <div className="col">
          <form onSubmit={handleSubmit}>
            <input placeholder="Email Address" className="form-control form-control-lg my-2" type="email" onChange={(e)=>setEmail(e.target.value)}/>
            <input placeholder="Password" className="form-control form-control-lg my-2" type="password" onChange={(e)=>setPassword(e.target.value)}/>
            <div className="col-auto">
              <button className="btn btn-lg btn-success mx-2">Sign Up</button>
              <p className="py-">
                  Already have an account? <Link to="/" className="underline">Sign in.</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp
