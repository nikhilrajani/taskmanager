import React from 'react'
import {UserAuth} from '../context/AuthContext';
import {useNavigate} from 'react-router-dom';

const Account = () => {
  const {user,logout}=UserAuth();
  const navigate=useNavigate();


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
    <div className="max-w-[600px] mx-auto my-16 p-4">
      <h1 className="text-2xl font-bold py-4">Account</h1>
      <p>User Email: {user && user.email}</p>
      <button onClick={handleLogOut} className="border px-6 py-2 my-4">Log Out</button>
    </div>
  )
}

export default Account
