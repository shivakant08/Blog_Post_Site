import { useState } from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Hero from './Components/Hero'
import AuthModal from './Modal/AuthModal'


function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [authType, setAuthType] = useState("signin")

  return (
    <>

      <Header
        onOpenAuthModal={(type) => {
          setAuthType(type)
          setIsAuthOpen(true)
        }}
      />
      <Hero />
      <Footer />

      <AuthModal
        isOpen={isAuthOpen}
        type={authType}
        onClose={() => setIsAuthOpen(false)}          // closes modal
        onSwitch={(newType) => setAuthType(newType)} />

    </>
  )
}

export default App
