import React, { useEffect } from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'


export default function App(){
    const[dice, setDice] = React.useState(allNewDice())
    const[tenzies, newTenzies] = React.useState(false)

    // useEffect
    React.useEffect(()=>{
        const val = dice[0].value
        if(dice.every(die => die.isHeld===true) && dice.every(die => die.value === val)){
            newTenzies(true)
            console.log("You Won!")
        }
    }, [dice])


    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push({
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid()
            })
        }
        return newDice
    }
    function afterRoll(){
        return dice.map(die => {
            return die.isHeld === true?
            die:
            {
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid()
            }
        })
    }
    const diceElements = dice.map(die => 
    <Die 
        key={die.id} 
        value={die.value} 
        isHeld={die.isHeld} 
        holdDice ={() => holdDice(die.id)}
    />)
    
    function reRoll(){
        if(tenzies === true){
            setDice(allNewDice())
            newTenzies(false)
        }else{
            setDice(afterRoll())
        }
    }
    function holdDice(id){
        setDice(prevDice => prevDice.map(die => {
                return die.id===id?
                {...die, isHeld: !die.isHeld}:
                die
            })
        )
    }
    return(
        <main>
            {tenzies && <Confetti />} {/* Render Confetti component if `tenzies` is true*/}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button className="roll-button" onClick={reRoll}>Roll</button>
        </main>
    )
}