import React from 'react'
import SectionWrapper from './SectionWrapper'

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
  return (
    // Pass header and title as attribute style props to SectionWrapper component.
    <SectionWrapper header={"generate your workout"} title={['Time', 'to', 'flex', 'those', 'Claws']}>
        {/* In JSX, you can use a self-closing tag if a component does not have any children. <Header /> acts the same as <Header></Header>. */}
        <Header index={'01'} title={'Choose your challenge'} description={"selection the workout you wish to endure."} />
        
    </SectionWrapper>
  )
}