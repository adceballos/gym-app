import React, {useState} from 'react'
import SectionWrapper from './SectionWrapper'
import { SCHEMES, WORKOUTS } from '../utils/swoldier'
import Button from './Button'

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

// destructure out state values
export default function Generator(props) {
  // destructure values from App.jsx
  const { muscles, setMuscles, poison, setPoison, goal, setGoal, updateWorkout } = props
  // We import {useState} to use a React stateful variable instead of a traditional variable. First value is the current state, and second value is the function that is used to update our state. useState is the hook that is declared with a default value.
  const [showModal, setShowModal] = useState(false)

  function toggleModal() {
    setShowModal(!showModal)
  }

  // function to select and deselect muscle groups. Does so by adding or removing selected muscle groups from the muscles array.
  function updateMuscles(muscleGroup) {
    if (muscles.includes(muscleGroup)) {
      // functionality to select and deselect muscle groups.
      // .filter() creates a new array that excludes the clicked muscleGroup by iterating over each muscleGroup in the muscles array and keeping the ones that are not equal to the clicked muscle.
      setMuscles(muscles.filter(val => val !== muscleGroup))
      return
    }
    
    // Limit muscle group selection to 3.
    if (muscles.length > 2) {
      return
    }

    // If the user selects a different split, update the muscles state to be a new array that contains only the selected muscleGroup.
    if (poison !== 'individual') {
      setMuscles([muscleGroup])
      // close modal after one selection
      setShowModal(false)
      return
    }

    // spread operator (...) is used to create a new array that includes all the elements of the existing muscles array, followed by the newly selected muscleGroup.
    setMuscles([...muscles, muscleGroup])

    // If 3 muscles have been selected, close the modal.
    if (muscles.length === 2) {
      setShowModal(false)
    }
  }
  return (
    // Pass header and title as attribute style props to SectionWrapper component.
    <SectionWrapper id={'generate'} header={"generate your workout"} title={['Prepare', 'to', 'make', 'waves']}>
        {/* In JSX, you can use a self-closing tag if a component does not have any children. <Header /> acts the same as <Header></Header>. */}
        <Header index={'01'} title={'Pick your poison'} description={"Select the workout you wish to endure."} />
        {/* Retrieve an array of keys from WORKOUTS object located in swoldier.js, then map each key as a button, representing 4 different workout splits.
            In the arrow function, type represents the current key, and typeIndex represents the index of that key in the array. */}
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
          {Object.keys(WORKOUTS).map((type, typeIndex) => {
            return (
              // When the button is clicked, the anonymous arrow function is called, and the state variable 'poison' is updated to the value of 'type', which is just whatever the user selects.
              <button onClick={() => {
                // Reset muscles array so that when selecting a new split (poison), muscle group selection is reset.
                setMuscles([])
                setPoison(type)
              {/* */}
              }} className={' bg-slate-950 border duration-200 px-4 hover:border-blue-600 py-3 rounded-lg ' + (type === poison ? 'border-blue-600' : 'border-blue-400')} key={typeIndex}>
                {/* Use .replaceAll within curly braces because its a JS function to remove all underscores. */}
                <p className='capitalize'>{type.replaceAll('_', " ")}</p>
              </button>
            )
          })}
        </div>

        <Header index={'02'} title={'Lock on targets'} description={"Select the muscles judged for annihilation."} />
        <div className='bg-slate-950 border border-solid border-blue-400 rounded-lg flex flex-col'>
          {/* within onClick, we directly assign the toggleModal function instead of calling it through toggleModal(). We do this because the function would be called when the web page is painted, thus breaking our application. */}
          <button onClick={toggleModal} className='relative flex items-center justify-center p-3'>
            {/* muscles.length indicates size of array/muscles selected. If no muscles have been selected, prompt the user to select them, otherwise join the selected muscle array elements into a space separated string and display it on the dropdown bar. */}
            <p className='capitalize'>{muscles.length === 0 ? 'Select muscle groups' : muscles.join(' ')}</p>
            {/* Carrot down icon imported from fontawesome, then moved it to the right of our box. */}
            <i className="fa-solid fa-caret-down absolute right-3 top-1/2 -translate-y-1/2"></i>
          </button>
          {/* Use short circuit operator (&&) to conditionally render the <div>...</div>. If showModal is true (dropdown button is clicked), everything after && is rendered (the dropdown displays all of the muscleGroup buttons). */}
          {showModal && (
            <div className='flex flex-col p-3'>
              {/* Access array of individual muscle groups if individual split is selected, otherwise access array through key. This is because individual is just an array, whereas the other splits are objects with key(muscle region) value(array of muscles associated with muscle region) pairs. */}
              {(poison === 'individual' ? WORKOUTS[poison] : Object.keys(WORKOUTS[poison])).map((muscleGroup, muscleGroupIndex) => {
                return (
                  // When button is clicked, anonymous arrow function calls updateMuscles function and passes the currently selected muscle group. Use .includes() to check if the current muscleGroup is included in the muscles state array (i.e., whether the muscle group has been selected), and highlight the text color blue.
                  <button onClick={() => {updateMuscles(muscleGroup)}} key={muscleGroupIndex} className={'hover:text-blue-400 duration-200 ' + (muscles.includes(muscleGroup) ? 'text-blue-400' : '')}>
                    <p className='uppercase'>{muscleGroup.replaceAll('_', " ")}</p>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/*  Object.keys(SCHEMES) returns an array of keys from the SCHEMES object (['strength_power', etc...]). .map() iterates over each key scheme and returns a button for each. key={schemeIndex} is used to assign a unique index to each button based on its position in SCHEMES. */}
        <Header index={'03'} title={'Rule the waves'} description={"Select your ultimate objective."} />
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
          {Object.keys(SCHEMES).map((scheme, schemeIndex) => {
            return (
              <button onClick={() => {
                setGoal(scheme)
              }} className={'bg-slate-950 border duration-200 px-4 hover:border-blue-600 py-3 rounded-lg ' + (scheme === goal ? 'border-blue-600' : 'border-blue-400')} key={schemeIndex}>
                <p className='capitalize'>{scheme.replaceAll('_', " ")}</p>
              </button>
            )
          })}
        </div>
        {/* updateWorkout function is passed as reference and then called when the formulate button is clicked. If we used (), we'd be calling the function when the page is painted. Instead, we're telling React it should be called later when something happens (button is clicked). The updateWorkout function then calls generateWorkout() in App.jsx. */}
        <Button func={updateWorkout} text={"formulate"}></Button>
    </SectionWrapper>
  )
}