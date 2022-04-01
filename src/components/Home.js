import React, { useState, useEffect } from 'react'
import { MDBInput } from 'mdb-react-ui-kit';
import Dropdown from './Dropdown/Dropdown';
import Button from './Button/Button';


export default function Home() {

    const [value, setInputValue] = useState('')
    const [text, setText] = useState('')
    const [skinInfo, setSkinInfo] = useState(true)
    const [hint, setShowHint] = useState(true)
    const [skin, setSkin ] = useState('')
    const [suggestions, setSuggestions ] = useState('')

    function onTextChange(e) {
        const value = e.target.value
        
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, `i`);
            
            let length = Object.keys(images).length
            let nameArray = Object.keys(images)
            let imageArray = Object.values(images)
            let suggestions = []

            for (let i =0 ; i < nameArray.length; i++)  {
                    let match = nameArray.filter(v=> regex.test(v))
                    
                    
                    match.forEach(skin => {
                        if (!suggestions.includes(skin)) suggestions.push(skin)
                    })
            }
            
            
            setSuggestions(suggestions)
        }
        setInputValue(value)
    }

    const images = importAll(require.context('../assets/SkinImages', false, /\.(png|jpe?g|svg)$/));

    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }

    const renderSuggestions = () => {
        if (suggestions.length === 0) {
            return null
    }
    return (
        <ul style={{ height: '100px' , overflow: 'scroll' }}>
            {suggestions.map(tech => {
                return (
                <li>
                    {tech}
                </li>
                )
                
            })}
        </ul>
    )
    }

    useEffect(() => {

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
                <MDBInput onChange={onTextChange} value={value} label='Weapon Name' id='form1' type='text' contrast />
                {renderSuggestions()}
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
                onClick={()=> submitGuess(value)}
                color='primary'
                text='submit'
                />
            </div>
        </div>
    )

}