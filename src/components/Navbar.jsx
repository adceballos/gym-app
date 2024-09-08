import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-slate-800 text-white shadow-md py-4 px-6 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo and Image */}
        <div className="flex items-center space-x-2">
        <img
            src="./public/assets/images/MantisFitnessLogoNew.PNG"
            alt="Mantis Fitness logo"
            className="w-14 h-18" // Adjust size of the image
          />
          <div className="text-3xl font-semibold">
            <span className='text-blue-400'>MANTIS</span> FITNESS
          </div>
        </div>
        {/* Links */}
        <div className="space-x-6 text-lg">
          <Link to="/" className="hover:text-blue-400 duration-200">Home</Link>
          <Link to="/nutrition" className="hover:text-blue-400 duration-200">Nutrition</Link>
        </div>
      </div>
    </nav>
  )
}
