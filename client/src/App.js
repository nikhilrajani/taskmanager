import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Account from './components/Account'
import { AuthContextProvider } from './context/AuthContext' 
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <div>
      <h1 className="text-center text-3xl font-bold">
        Firebase Auth & Context
      </h1>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/account" element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AuthContextProvider>
    </div>
  )
}

export default App
