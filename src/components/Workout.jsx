import React from 'react'
import SectionWrapper from './SectionWrapper'
import ExerciseCard from './ExerciseCard'

export default function Workout(props) {
  const { workout } = props
  return (
    <SectionWrapper header={"Dive into"} title={['The', <span className='uppercase text-blue-400'>DEEP</span>, 'end']}>
      <div className='flex flex-col'>
        {workout.map((exercise, i) => {
          return (
            <ExerciseCard exercise={exercise} key={i} />
          )
        })}
      </div>
    </SectionWrapper>
  )
}