import React from 'react'
import SectionWrapper from './SectionWrapper'

export default function Generator() {
  return (
    // Pass header and title as attribute style props to SectionWrapper component.
    <SectionWrapper header={"generate your workout"} title={['Time', 'to', 'flex', 'those', 'Claws']}>

    </SectionWrapper>
      )
}