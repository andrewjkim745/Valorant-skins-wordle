import React, { useState, useEffect } from 'react'
import { MDBInput } from 'mdb-react-ui-kit';
import Dropdown from './Dropdown/Dropdown';
import Button from './Button/Button';


export default function Home() {

    const [inputValue, setInputValue] = useState('')
    const [skinInfo, setSkinInfo] = useState(true)
    const [hint, setShowHint] = useState(true)
    const [skin, setSkin ] = useState('')

    function onTextChange(e) {
        const value = e.target.value
        
        if (value.length > 0) {
            const regex = new RegExp(`^${inputValue}`, `i`);
            let i = 0
            let suggestions = []

            while (i < Object.keys(images).length - 1)  {
                    let match = Object.keys(images[i].filter(v=> regex.test(v)))
                    
                    match.forEach(skin => {
                        (suggestions.includes(skin) ? console.log('already included') : suggestions.push(skin))
                    })
                    i++
            }
            
            setSuggestions(suggestions)
        }
        setText(value)
    }

    const images = importAll(require.context('../assets/SkinImages', false, /\.(png|jpe?g|svg)$/));

    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }

    useEffect(() => {
        console.log('image array from folder', Object.keys(images))
        console.log('image array with srcs from folder', Object.values(images))
    })

    const submitGuess = () => {
        console.log('clicked')
    }

    return (
        <div className='w-100 vh-100 bg-dark'>
            <h1 className='text-white text-center'>Valordle!</h1>
            <h2 className='text-white text-center'>A Valorant Skins Wordle Game by <a href='https://github.com/andrewjkim745'>andrewjkim745</a></h2>
            <p className='text-white text-center'>Updates at 00:00 GMT-10</p>
            <div className='w-100 d-flex flex-column justify-content-center align-items-center'>
                <MDBInput onChange={(e) => onTextChange(e.target.value)} value={inputValue} label='Weapon Name' id='form1' type='text' contrast />
                <Dropdown />
                <Button
                    toggle={'toggle'}
                    color='danger'
                    onClick={() => setSkinInfo(!skinInfo)}
                    text={`Skin info ${skinInfo ? 'on' : 'off'}`}
                />
                <Button
                    color='warning'
                    onClick={() => setShowHint(!hint)}
                    text={`Show hint ${hint ? 'off' : 'on'}`}
                />
                <Button
                onClick={()=> submitGuess(inputValue)}
                color='primary'
                text='submit'
                />
            </div>
        </div>
    )

}