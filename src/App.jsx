// hub of our application
import { useState } from 'react'
import Hero from './components/Hero'
import Generator from './components/Generator'
import Workout from './components/Workout'
// import exported generateWorkout function
import { generateWorkout } from './utils/functions'

function App() {
  // States can be passed down, but cannot be passed up. We initialize our states here so we can have access to these values in our top level component (App.jsx) because we need them to generate our workout.
  const [workout, setWorkout] = useState(null)
  const [poison, setPoison] = useState('individual')
  const [muscles, setMuscles] = useState([])
  const [goal, setGoal] = useState('strength_power')

  function updateWorkout() {
    // do nothing if no muscles are selected
    if (muscles.length < 1) {
      return
    }
    // Generate a new workout based on the selected split (poison), muscle groups, and goal, (pass them as object using {}), then update the state with the generated workout.
    let newWorkout = generateWorkout({poison, muscles, goal})
    setWorkout(newWorkout)

    // Scroll down to generated exercises after clicking formulate button. References workout ID that is intitialized in SectionWrapper element in Workout.jsx component. setTimeout ensures the DOM has time to update with the exercise cards before attempting to scroll to it.
    setTimeout(() => {
      window.location.href = '#workout'
    }, 100);
  }

  return (
    <main className='min-h-screen flex flex-col bg-gradient-to-r from-slate-800 to-slate-950 text-white text-sm sm:text-base'>
     <Hero />
     <Generator 
     poison={poison}
     setPoison={setPoison}
     muscles={muscles}
     setMuscles={setMuscles}
     goal={goal}
     setGoal={setGoal}
     updateWorkout={updateWorkout}
     />
     {/* Conditionally render workout, so it is rendered only if a workout exists. */}
     {workout && (<Workout workout={workout} />)}
    </main>
  )
}

export default App