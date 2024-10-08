// react functional component (rfc). component is a function that has the same name as file. Component file name and function is always capitalized.
// .jsx files have javascript and html code.
import React from 'react'
import Button from './Button'

export default function Hero() {
  return (
    <div className='min-h-screen flex flex-col gap-10 items-center justify-center text-center max-w-[800px] w-full mx-auto p-4'>
      <div className='flex flex-col gap-4'>
        <p>GET READY TO DIVE <span>DEEP</span></p>
        <h1 className='font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl'><span className='text-blue-400'>MANTIS</span> FITNESS</h1>
      </div>
      <p className='text-sm md:text-base font-light'>I hereby acknowledge that I may develop <span className='text-blue-400 font-medium'>mantis shrimp-level strength</span> and accept all risks of feeling like a <span className='text-blue-400 font-medium'>big fish</span> in a small pond. Side effects include severe body dysmorphia and the inability to fit through doors.</p>
      {/* Use anonymous arrow function and pass it as a prop so that the window scrolls down to the workout selection section on button click. */}
      <Button func={() => {
        window.location.href = '#generate'
      }} text={"Accept & Begin"}></Button>
    </div>
  )
}