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
      navigate("/account")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="max-w-[700px] mx-auto my-16 p-4">
      <div>
        <h1 className="text-2xl font-bold py-2">Sign up for free</h1>
        <p className="py-2">
            Already have an account? <Link to="/" className="underline">Sign in.</Link>
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col py-2">
            <label className="py-2 font-medium">Email Address</label>
            <input className="border p-3" type="email" onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className="flex flex-col py-2">
            <label className="py-2 font-medium">Password</label>
            <input className="border p-3" type="password" onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <button className="border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white">Sign Up</button>
      </form>
    </div>
  )
}

export default SignUp
