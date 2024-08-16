import React, {useState} from 'react'
import SectionWrapper from './SectionWrapper'
import { SCHEMES, WORKOUTS } from '../utils/swoldier'

// Header component
function Header(props) {
  const {index, title, description} = props
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-center gap-2'>
        <p className='text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-400'>{index}</p>
        <h4 className='text-xl sm:text-2xl md:text-3xl'>{title}</h4>
      </div>
      <p className='text-sm sm:text-base mx-auto'>{description}</p>
    </div>
  )
}

export default function Generator() {
  // We import {useState} to use a React stateful variable instead of a traditional variable. First value is the current state, and second value is the function that is used to update our state. useState is the hook that is declared with a default value.
  const [showModal, setShowModal] = useState(false)
  const [poison, setPoison] = useState('individual')
  const [muscles, setMuscles] = useState([])
  const [goals, setGoals] = useState('strength_power')

  function toggleModal() {
    setShowModal(!showModal)
    //showModal = !showModal
    }

  return (
    // Pass header and title as attribute style props to SectionWrapper component.
    <SectionWrapper header={"generate your workout"} title={['Time', 'to', 'flex', 'those', 'Claws']}>
        {/* In JSX, you can use a self-closing tag if a component does not have any children. <Header /> acts the same as <Header></Header>. */}
        <Header index={'01'} title={'Pick your poison'} description={"selection the workout you wish to endure."} />
        {/* Retrieve an array of keys from WORKOUTS object located in swoldier.js, then map each key as a button, representing 4 different workout splits.
            In the arrow function, type represents the current key, and type index represents the index of that key in the array. */}
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
          {Object.keys(WORKOUTS).map((type, typeIndex) => {
            return (
              <button className='bg-slate-950 border border-blue-400 py-3 rounded-lg hover:border-blue-600' key={typeIndex}>
                {/* Use .replaceAll within curly braces because its a JS function to remove all underscores. */}
                <p className='capitalize'>{type.replaceAll('_', " ")}</p>
              </button>
            )
          })}
        </div>
        <Header index={'02'} title={'Lock on Targets'} description={"selection the muscles judged for annihilation."} />
        <div className='bg-slate-950 border border-solid border-blue-400 rounded-lg flex flex-col'>
          <button onClick={toggleModal} className='relative flex items-center justify-center p-3'>
            <p>Select muscle groups</p>
            {/* Carrot down icon imported from fontawesome, then moved it to the right of our box. */}
            <i className="fa-solid fa-caret-down absolute right-3 top-1/2 -translate-y-1/2"></i>
          </button>
          { /* Conditional rendering section. Use short circuit operator if show model == true */ }
          {showModal && (
            <div>modal</div>
          )}
        </div>
    </SectionWrapper>
  )
}