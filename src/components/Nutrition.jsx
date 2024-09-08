import React from 'react'
import Navbar from './Navbar'

export default function Nutrition() {
  return (
    <main className='min-h-screen flex flex-col bg-gradient-to-r from-slate-800 to-slate-950 text-white text-sm sm:text-base'>
      <Navbar />
      
      {/* Title at the top */}
      <div className='flex justify-center py-8'>
        <h1 className='font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl'>
          <span className='text-blue-400'>NUTRITION</span> GUIDE
        </h1>
      </div>

      {/* Centered text */}
      <div className='flex-grow flex items-center justify-center'>
        <div className='flex flex-col gap-4 text-center max-w-[800px] w-full p-4'>
          <h2 className='text-2xl md:text-4xl font-light'>
            Coming Soon!
          </h2>
        </div>
      </div>
    </main>
  )
}

