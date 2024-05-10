import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {UserAuth} from '../context/AuthContext';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();

  const {signIn}=UserAuth();

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      await signIn(email,password);
      console.log("User Signed In Successfully!")
      navigate("/tasks")
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <div className='taskBg w-[600px] flex flex-col justify-center items-center'>
      <div className='row py-2'>
        <h1 className="">Sign in to your account</h1>
      </div>
      <div className='row'>
        <div className="col">
          <form onSubmit={handleSubmit}>
            <input placeholder="Email Address" className="form-control form-control-lg my-2" type="email" onChange={(e)=>setEmail(e.target.value)}/>
            <input placeholder="Password" className="form-control form-control-lg my-2" type="password" onChange={(e)=>setPassword(e.target.value)}/>
            <div className="col-auto">
              <button className="btn btn-lg btn-success mx-2">Log In</button>
              <p className="py-">
                  Don't have an account? <Link to="/sign-up" className="underline">Sign up.</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignIn
