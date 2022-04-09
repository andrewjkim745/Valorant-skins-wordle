import React, { useState, useEffect } from 'react'
import { MDBInput } from 'mdb-react-ui-kit';
import Dropdown from './Dropdown/Dropdown';
import Button from './Button/Button';


export default function Home() {

    const [updated, setUpdated] = useState(false)
    const [value, setInputValue] = useState('')
    const [answer, setAnswer] = useState('')
    const [skinInfo, setSkinInfo] = useState(true)
    const [hint, setShowHint] = useState(false)
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
            console.log(match)
            for (let i = 0; i < match.length; i++) {
                let prices = ['1750', '3350', '5350']
                let result1 = match[i].replace(/_|.png/g, ' ').slice(0, -1)
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
        setUpdated(!updated)
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
            <ul style={{ height: '100px', overflow: 'scroll', background: 'white' }}>
                {suggestions.map(tech => {
                    return (
                        <li onClick={() => clickSuggestion(tech.name)} style={{ listStyle: 'none' }}>
                            <img style={{ maxWidth: 50 }} src={tech.src} />
                            {tech.name}
                        </li>
                    )
                })}
            </ul>
        )
    }

    const renderHint = () => {
        if (!hint || correct) {
            return null
        }
        let slicedAnswer = answer.split(' ')
        let array = []
        console.log(slicedAnswer)
        let hintArray = slicedAnswer.map(word => {
            console.log('word', word)
            console.log('word', word.length)

            let emptyArray = new Array(word.length).fill('')
            let randomIndex = Math.floor(Math.random() * word.length)
            let randomEnd = Math.floor(Math.random() * word.length) === randomIndex ? randomIndex + 1 : randomIndex + 1 > word.length - 1 ? randomIndex - 1 : randomIndex + 1
            let slicedWord = randomIndex > randomEnd ? word.slice(randomEnd, randomIndex) : word.slice(randomIndex, randomEnd)
            console.log(randomIndex, randomEnd, slicedWord)
            emptyArray.fill(slicedWord, randomIndex, randomEnd)
            return emptyArray
                
        })
        console.log(hintArray)
        return (
            
            <div>
            <p className='text-white'>Skin has {hintArray.length} words in it</p>
            <div class='d-flex'>
            {hintArray.map(hint => {
                return (
                hint.map(letter => {
                    return <div className='box'>{letter}</div>
                })
                )
            })}
            </div>
            </div>
        )
    }

    const setDailyAnswer = () => {
        let nameArray = Object.keys(images)
        setAnswer(nameArray[Math.floor(Math.random() * nameArray.length)].replace(/_|.png/g, ' ').slice(0, -1))
    }

    useEffect(() => {
        setDailyAnswer()
    }, [updated])

    const submitGuess = () => {
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
                    text={`Show hint ${hint ? 'on' : 'off'}`}
                />
                {renderHint()}
                <Button
                    onClick={() => submitGuess(value)}
                    color='primary'
                    text='submit'
                />
                {correct ? <h1>You got it correct!</h1> : correct === false ? <h1>Click to show hint</h1> : null}
            </div>
        </div>
    )

}