import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {

  const [timeLeft, setTimeLeft] = useState(1*60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [encouragement, setEncouragement] = useState("");
  const [coins, setCoins] = useState(0);

  const cheerMessages = [
    "Keep going!",
    "You can do it!",
    "You're doing so well!",
    "Stay focused!"
  ]

  const breakMessages = [
    "Relax", 
    "You've earned this break", 
    "Refuel and recharge",
    "Stay hydrated!"
  ]

  /*fetch coins when app loads*/
  useEffect(() => {
    axios.get('http://localhost:5000/stats')
    .then(res => setCoins(res.data.coins))
    .catch(err => console.error(err));
  }, [])

  /*encouragement message updater*/
  useEffect(() => {
    let messageInterval: NodeJS.Timeout;

    if (isRunning) {
      const messages = isBreak ? breakMessages : cheerMessages;
      setEncouragement(messages[0]); // set first message initially 
      let index = 1;

      messageInterval = setInterval(() => {
        setEncouragement(messages[index]);
        index = (index + 1) % messages.length;
      }, 40000);  
    } else {
      setEncouragement("");
    }

    return () => clearInterval(messageInterval);
  }, [isRunning, isBreak]);

  /*countdown timer*/
  /*timer component. starts timer, time countdown, and stop and cleans up timer*/
  useEffect( () => {
    let timer: NodeJS.Timeout;

    if (isRunning) {
      if (timeLeft > 0) {
        timer = setInterval(() => {
          setTimeLeft(prev => prev - 1);
        }, 1000);
      } else {
        // time is up: stop timer, reward coins, and reset back to original time
        setIsRunning(false); // stops timer
        setTimeLeft(isBreak ? 5 * 60 : 1 * 60) // resets timer

        // send request to backend to update coins
        axios.post('http://localhost:5000/complete-cycle')
          .then(res => {
            setCoins(res.data.data.coins); // update coins state
          })
          .catch(err => console.error(err));
      }
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  /*formatting the time for 2 digits in minutes and seconds*/
  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');

    const s = (seconds % 60).toString().padStart(2,'0');
    return `${m}:${s}`;
  };

  /*function for work and break button*/
  const switchMode = (breakMode: boolean) => {
    setIsBreak(breakMode);
    setIsRunning(false);
    setTimeLeft(breakMode ? 5 * 60 : 1 * 60);
  }

  /*start button handler*/
  const handleClick = () => {
    if (!isRunning) {
      setIsRunning(true);
    } else {
      setIsRunning(false);
      setTimeLeft(isBreak ? 5 * 60 : 1 * 60);
    }

  }

  return ( 
    // <div style={{position: 'relative'}}>
    <div className="container" style={{position: 'relative'}}>
    <div>
      <button className="closeButton">
        Close
      </button>
    </div>

    <div className="home-content">
      <div className="home-controls">
        <button className="image-button" onClick={ () => switchMode(false)}>
          Work
        </button>
        <button className="image-button" onClick={ () => switchMode(true)}>
          Break
        </button>
        <button className ="image-button" onClick={ () => alert(`You have ${coins} coins!`)}>
          Coins
        </button>
      </div>

      <p className ={`encouragement-text ${!isRunning ? "hidden" : ""}`}>
        { encouragement }
      </p>

      <h1 className="home-timer">{formatTime(timeLeft)}</h1>

      <button className="home-button" onClick={handleClick}>
        Start
      </button>
    </div>
    </div>
  );
}

export default App;
