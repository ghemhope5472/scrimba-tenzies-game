import "./App.css";
import React, { useState, useEffect } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";

import Confetti from "react-confetti";

function App() {
  const [die, setDie] = useState(newDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(
    function () {
      const allHeld = die.every((dice) => dice.isHeld);
      const firsValue = die[0].value;
      const allSameValue = die.every((dice) => dice.value === firsValue);
      if (allHeld && allSameValue) {
        setTenzies(true);
        console.log("You won!");
      }
    },
    [die]
  );

  function generateDice() {
    return {
      value: Math.floor(Math.random() * (6 - 1) + 1),
      isHeld: false,
      id: nanoid(),
    };
  }

  function newDice() {
    const newArr = [];
    for (var i = 0; i < 10; i++) {
      newArr.push(generateDice());
    }
    return newArr;
  }

  function holdDice(id) {
    setDie((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  function rollDice() {
    setDie((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld ? die : generateDice();
      })
    );
  }

  function newGame() {
    if (tenzies) {
      setTenzies(!tenzies);
      setDie((oldDie) =>
        oldDie.map((dice) => {
          return dice.isHeld === true ? generateDice() : die;
        })
      );
    }
  }

  const diceElements = die.map((dice) => {
    return (
      <Die
        key={dice.id}
        value={dice.value}
        isHeld={dice.isHeld}
        id={dice.id}
        handleClick={holdDice}
        tenzies={tenzies}
      />
    );
  });

  return (
    <main>
      {tenzies && <Confetti />}
      <h1> {tenzies ? "We have a winner!" : "Tenzies Game"} </h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button className="btn" onClick={tenzies ? newGame : rollDice}>
        {" "}
        {tenzies ? "New Game" : "Roll"}{" "}
      </button>
    </main>
  );
}

export default App;
