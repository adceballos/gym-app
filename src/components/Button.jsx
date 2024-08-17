import React from 'react'

export default function Button(props) {
    const { text } = props
    return (
        // Button that was previously in Hero.jsx, but created it as a component because we want to reuse this button in Generator.jsx. Better practice to create a component for code that will be reused.
        <button className='px-8 py-4 rounded-md border border-solid border-[2px] border-blue-400 bg-slate-950 blueShadow duration-200'>
            <p>{text}</p>
        </button>
    )
}
