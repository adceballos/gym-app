// hub of our application
import { useState } from 'react'
import Hero from './components/Hero'
import Generator from './components/Generator'
import Workout from './components/Workout'

function App() {
  return (
    // "<>" opening and "</>" closing are react fragments, which is essentially just an empty div. We swapped it out for a "main" section.
    <main>
     <Hero />
     <Generator />
     <Workout />
    </main>
  )
}

export default App