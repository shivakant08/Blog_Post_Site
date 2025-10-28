import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState , useContext} from 'react'
import Header from './Components/Header'
import AuthModal from './Modal/AuthModal'
import Dashboard from './Pages/Dashboard'
import Home from "./Pages/Home"
import About from "./Pages/About"
import Blogs from "./Pages/Blogs"
import MyBlog from "./Pages/MyBlog"
import GoogleSuccess from './Pages/GoogleSuccess'
import ProtectedRoute from './Components/ProtectedRoute'
import { Toaster } from 'react-hot-toast'
import { AuthContext } from './context/AuthContext'


function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [authType, setAuthType] = useState("signin")

  const {user} = useContext(AuthContext)

  return (
    <>
      <Toaster position='top-right' reverseOrder={false} />




      <Header
        onOpenAuthModal={(type) => {
          setAuthType(type)
          setIsAuthOpen(true)
        }}
      />
      <main className='pt-16'>
      <Routes>

        <Route path='/' element={ user ? <Navigate to="/home"/> :
          <Dashboard />
        } />
        <Route path='/home' element={<ProtectedRoute>
          <Home />
        </ProtectedRoute>} />
        <Route path='/about' element={<ProtectedRoute>
          <About />
        </ProtectedRoute>} />
        <Route path='/blogs' element={<ProtectedRoute>
          <Blogs />
        </ProtectedRoute>} />
        <Route path='/my-blog' element={<ProtectedRoute>
          <MyBlog />
        </ProtectedRoute>} />

        <Route path='/google-success' element={<GoogleSuccess/>}/>

      </Routes>
      </main>



      <AuthModal
        isOpen={isAuthOpen}
        type={authType}
        onClose={() => setIsAuthOpen(false)}          // closes modal
        onSwitch={(newType) => setAuthType(newType)} />




    </>
  )
}

export default App
