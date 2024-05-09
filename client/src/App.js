import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Account from './components/Account'
import { AuthContextProvider } from './context/AuthContext' 
import ProtectedRoute from './components/ProtectedRoute'
import Tasks from './components/Tasks'
import Update from './components/Update'
import Add from './components/Add'

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
          <Route path="/tasks" element={
              <ProtectedRoute>
                <Tasks />
              </ProtectedRoute>
            } 
          />
          <Route path="/add" element={
              <ProtectedRoute>
                <Add />
              </ProtectedRoute>
            } 
          />
          <Route path="/update" element={
              <ProtectedRoute>
                <Update />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AuthContextProvider>
    </div>
  )
}

export default App
