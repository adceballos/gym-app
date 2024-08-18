import React from 'react'
import SectionWrapper from './SectionWrapper'
import ExerciseCard from './ExerciseCard'

export default function Workout(props) {
  const { workout } = props
  return (
    <SectionWrapper id={'workout'} header={"Dive into"} title={['The', <span className='uppercase text-blue-400'>DEEP</span>, 'end']}>
      <div className='flex flex-col gap-4'>
        {/* Render an exerciseCard component for each exercise in the workout array. Each exercise represents an individual item (an exercise object), and i represents the index of that exercise in the array.*/}
        {workout.map((exercise, i) => {
          return (
            <ExerciseCard i={i} exercise={exercise} key={i} />
          )
        })}
      </div>
    </SectionWrapper>
  )
}