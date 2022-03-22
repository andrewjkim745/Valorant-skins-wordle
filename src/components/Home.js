import React, {useState, useEffect } from 'react'



export default function Home() {

    const [ inputValue, setInputValue ] = useState('')


    return (
        <div className='w-100 vh-100 bg-dark'>
        <h1 className='text-white text-center'>Valordle!</h1>
        <h2 className='text-white text-center'>A Valorant Skins Wordle Game by <a href='https://github.com/andrewjkim745'>andrewjkim745</a></h2>
        </div>
    )

}