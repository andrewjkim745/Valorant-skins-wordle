import React, { useState, useEffect } from 'react'
import { MDBInput } from 'mdb-react-ui-kit';
import Dropdown from './Dropdown/Dropdown';
import Button from './Button/Button';


export default function Home() {

    const [value, setInputValue] = useState('')
    const [answer, setAnswer] = useState('')
    const [skinInfo, setSkinInfo] = useState(true)
    const [hint, setShowHint] = useState(true)
    const [suggestions, setSuggestions ] = useState('')
    const [correct, setCorrect] = useState('')

    function onTextChange(e) {
        const value = e.target.value
        
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, `i`);
            
            let array = []
            let nameArray = Object.keys(images)
            console.log('images object', images)
            let match = nameArray.filter(v => regex.test(v))
            console.log(match)
            for ( let i = 0; i < match.length; i++) {
                let prices = ['1750', '3350', '5350']
                let result1 = match[i].replace(/_|.png/g, ' ').slice(0,-1)
                let obj = {}
                obj.name = result1
                obj.src = images[match[i]]
                obj.price = prices[Math.floor(Math.random() * prices.length)];
                array.push(obj)
            }

            console.log(array)
  
            setSuggestions(array)
        }
        setInputValue(value)
    }

    const clickSuggestion = (tech) => {
        setInputValue(tech)
        setSuggestions([])
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
        <ul style={{ height: '100px' , overflow: 'scroll', background: 'white' }}>
            {suggestions.map(tech => {
                return (
                <li onClick={()=> clickSuggestion(tech.name)} style={{ listStyle: 'none'}}>
                    <img style={{maxWidth: 50 }}src={tech.src}/>
                    {tech.name}
                </li>
                )
            })}
        </ul>
    )
    }

    const setDailyAnswer = () => {
        let nameArray = Object.keys(images)
        setAnswer(nameArray[Math.floor(Math.random() * nameArray.length)])
    }

    useEffect(() => {
        const setDailyAnswer = () => {
            let nameArray = Object.keys(images)
            setAnswer(nameArray[Math.floor(Math.random() * nameArray.length)])
        }
    })

    const submitGuess = () => {
        console.log('clicked')
        (answer == value ? setCorrect(true) : setCorrect(false))

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