import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import Header from './Components/Header'
import AuthModal from './Modal/AuthModal'
import Dashboard from './Pages/Dashboard'
import Home from "./Pages/Home"
import Explore from "./Pages/Explore"
import Users from "./Pages/Users"
import Profile from "./Pages/Profile"
import CreatePost from "./Pages/CreatePost"
import GoogleSuccess from './Pages/GoogleSuccess'
import ProtectedRoute from './Components/ProtectedRoute'
import { Toaster } from 'react-hot-toast'
import { AuthContext } from './context/AuthContext'
import PostDetails from './Pages/PostDetails'
import UserProfile from './Pages/UserProfile'
import EditProfile from './Pages/EditProfile'
import EditPost from './Pages/EditPost'
import ResetPassword from './Pages/ResetPassword'

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [authType, setAuthType] = useState("signin")

  const { user } = useContext(AuthContext)

  return (
    <>
      <Toaster position='top-right' reverseOrder={false} />

      <Header
        onOpenAuthModal={(type) => {
          setAuthType(type)
          setIsAuthOpen(true)
        }}
      />

      <main className="min-h-screen pt-[40px]">

        <Routes>
          {/* Landing or Auth redirect */}
          <Route
            path='/'
            element={user ? <Navigate to="/home" /> : <Dashboard />}
          />

          {/* Protected Routes */}
          <Route
            path='/home'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path='/explore'
            element={
              <ProtectedRoute>
                <Explore />
              </ProtectedRoute>
            }
          />

          {/* 🆕 Add this route for Explore Post Details */}
          <Route
            path='/explore/post/:id'
            element={
              <ProtectedRoute>
                <PostDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path='/users'
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />

          <Route
            path='/users/:id'
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path='/create-post'
            element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            }
          />

          <Route
            path='/post/:id'
            element={
              <ProtectedRoute>
                <PostDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path='/edit-profile'
            element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            }
          />


          <Route
            path='/post/:id/edit'
            element={
              <ProtectedRoute>
                <EditPost />
              </ProtectedRoute>
            }
          />

          <Route
            path='/reset-password/:token'
            element={
              <ResetPassword />

            }
          />



          <Route path='/google-success' element={<GoogleSuccess />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </main>

      <AuthModal
        isOpen={isAuthOpen}
        type={authType}
        onClose={() => setIsAuthOpen(false)}
        onSwitch={(newType) => setAuthType(newType)}
      />
    </>
  )
}

export default App
