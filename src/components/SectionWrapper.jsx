import React from 'react'

// Use this component to consistently apply layout or styling to the wrapped content.
// The children content is anything wrapped between the parent tags <SectionWrapper></SectionWrapper>, wherever the tag is being rendered.
// header and title are wrapped in deconstructed and styled.
export default function SectionWrapper(props) {
    const {children, header, title} = props
  return (
    <section className='min-h-screen flex flex-col gap-10'>
        <div className='bg-slate-950 py-10 flex flex-col gap-2 justify-center items-center'>
            <p className='uppercase font-medium'>{header}</p>
            <h2 className='font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl'>{title[0]} {title[1]} {title[2]} {title[3]} <span className='uppercase text-blue-400'>{title[4]}</span></h2>
        </div>
        {children}
    </section>
  )
}