import React, { useState, useEffect } from 'react'
import { MDBInput } from 'mdb-react-ui-kit';
import Dropdown from './Dropdown/Dropdown';
import Button from './Button/Button';
import Modal from './modal'


export default function Home() {

    const [updated, setUpdated] = useState(false)
    const [value, setInputValue] = useState('')
    const [answer, setAnswer] = useState('')
    const [skinInfo, setSkinInfo] = useState(false)
    const [hint, setShowHint] = useState(false)
    const [boxes, setBoxes] = useState('')
    const [suggestions, setSuggestions] = useState('')
    const [correct, setCorrect] = useState('')

    function onTextChange(e) {
        const value = e.target.value
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, `i`);
            let array = []
            let nameArray = Object.keys(images)
            console.log('images object', images)
            let match = nameArray.filter(v => regex.test(v))
            for (let i = 0; i < match.length; i++) {
                let prices = ['1750', '3350', '5350']
                let result1 = match[i].replace(/_|.png/g, ' ').slice(0, -1)
                let obj = {}
                obj.name = result1
                obj.src = images[match[i]]
                obj.price = prices[Math.floor(Math.random() * prices.length)];
                array.push(obj)
            }
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
            <ul className='px-1 pt-1' style={{ height: '250px', overflow: 'scroll', background: 'white', maxWidth: 220 }}>
                {suggestions.map(tech => {
                    return (
                        <li class='d-flex justify-content-center align-items-center mt-3' onClick={() => clickSuggestion(tech.name)} style={{ listStyle: 'none' }}>
                            <img style={{ maxWidth: 80 }} src={tech.src} />
                            {tech.name}
                        </li>
                    )
                })}
            </ul>
        )
    }

    const renderHint = () => {
        if (boxes) return null
        let slicedAnswer = answer.split(' ')
        console.log(slicedAnswer)
        let hintArray = slicedAnswer.map(word => {
            console.log('word', word)
            console.log('word', word.length)
            let emptyArray = new Array(word.length).fill('')
            let randomIndex = Math.floor(Math.random() * word.length)
            let randomEnd = Math.floor(Math.random() * word.length) === randomIndex ? randomIndex + 1 : randomIndex + 1 > word.length - 1 ? randomIndex - 1 : randomIndex + 1
            let slicedWord = randomIndex > randomEnd ? word.slice(randomEnd, randomIndex) : word.slice(randomIndex, randomEnd)
            console.log(randomIndex, randomEnd, slicedWord)
            emptyArray.fill(slicedWord.toUpperCase(), randomIndex, randomEnd)
            return emptyArray

        })
        console.log(hintArray)
        setBoxes(hintArray)
    }

    const setDailyAnswer = () => {
        let nameArray = Object.keys(images)
        setAnswer(nameArray[Math.floor(Math.random() * nameArray.length)].replace(/_|.png/g, ' ').slice(0, -1))
    }

    

    useEffect(() => {
        setDailyAnswer()
        
    }, [])

    const submitGuess = () => {
            (answer == value ? setCorrect(true) : setCorrect(false))
            if (setCorrect(true)) { 
                alert('You got it correct! Thanks for playing and come back at')
            }
    }

    const renderSkinHint = () => {
        let skinLetter = answer[0]
        return (
            <>
            {skinInfo && <h1>Skin starts with {skinLetter}</h1>}
            </>
        )
    }

    return (
        <div className='w-100 vh-100 bg-dark'>
            <h1 className='pt-3 text-white text-center'>Valordle!</h1>
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
                {renderSkinHint()}
                <Button
                    color='warning'
                    onClick={() => { setShowHint(!hint); renderHint(); }}
                    text={`Show hint ${hint ? 'on' : 'off'}`}
                />
                {boxes && hint ?
                    boxes.map(box => {
                        return (
                            <>
                                <div class='d-flex mb-4'>
                                    {box.map(letter => {
                                        return (
                                            <div className='box'>{letter}</div>
                                        )
                                    })}
                                </div>
                            </>
                        )
                    }): null}
                <Button
                    onClick={() => submitGuess(value)}
                    color='primary'
                    text='submit'
                />
                <Modal
                SubmitGuess={submitGuess(value)}
                />
                {correct ? <h1>You got it correct!</h1> : correct === false ? <h1>Wrong!</h1> : null}
            </div>
        </div>
    )

}