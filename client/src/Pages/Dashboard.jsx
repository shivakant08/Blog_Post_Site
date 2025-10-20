import React from 'react'
import Hero from '../Components/Hero'
import Footer from '../Components/Footer'

const Dashboard = () => {
    return (
        <div className='flex flex-col min-h-screen bg-gray-900'>
            <Hero />
            <Footer />
        </div>
    )
}

export default Dashboard