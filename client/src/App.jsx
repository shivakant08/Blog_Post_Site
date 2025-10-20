import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Header from './Components/Header'
import AuthModal from './Modal/AuthModal'
import Home from "./Pages/Home"
import About from "./Pages/About"
import Blogs from "./Pages/Blogs"
import MyBlog from "./Pages/MyBlog"
import ProtectedRoute from './Components/ProtectedRoute'

import { Toaster } from 'react-hot-toast'

import Dashboard from './Pages/Dashboard'


function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [authType, setAuthType] = useState("signin")

  return (
    <>
      <Toaster position='top-right' reverseOrder={false} />
      
        


          <Header
            onOpenAuthModal={(type) => {
              setAuthType(type)
              setIsAuthOpen(true)
            }}
          />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/home' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/blogs' element={<Blogs />} />
            <Route path='/my-blog' element={<MyBlog />} />

          </Routes>



          <AuthModal
            isOpen={isAuthOpen}
            type={authType}
            onClose={() => setIsAuthOpen(false)}          // closes modal
            onSwitch={(newType) => setAuthType(newType)} />
        
      


    </>
  )
}

export default App
