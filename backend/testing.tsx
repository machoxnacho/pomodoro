import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import coinIcon from "../src/assets/coin.png";
import menuIcon from "../src/assets/menu.png";
import smiski1 from "../src/assets/smiski1.png";
import smiski2 from "../src/assets/smiski2.png";
import smiski3 from "../src/assets/smiski3.png";
import smiski4 from "../src/assets/smiski4.png";
import bgsmiski from "../src/assets/bgsmiski.png";


import { v4 as uuidv4 } from 'uuid';

function App() {

  const [timeLeft, setTimeLeft] = useState(1*60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [encouragement, setEncouragement] = useState("");
  const [coins, setCoins] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [userId, setUserId] = useState("");
  const [showShopMenu, setShowShopMenu] = useState(false);
  const smiskiImages = [smiski1, smiski2, smiski3, smiski4];
  const [showCollectionMenu, setShowCollectionMenu] = useState(false);


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

  /*every user/device will have a unique ID */
  useEffect(() => {
   let storedId = localStorage.getItem("userId");
   if (!storedId) {
    storedId = uuidv4();
    localStorage.setItem("userId", storedId);
   } 
   setUserId(storedId);

   // fetch stats for userId
   axios.get(`http://localhost:5000/stats/${storedId}`)
    .then(res => {
      setCoins(res.data.coins);
      // set other user re;ated data if needed
    })
    .catch(err => console.error(err));
  }, []);

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
        // time is up
        setIsRunning(false); // stop timer

        if (!isBreak) {
          // finish a work session and reward coins
          axios.post('http://localhost:5000/complete-cycle', { userId })
          .then(res => {
            setCoins(res.data.data.coins);
          })
          .catch(err => console.error(err));

          // prepare for break, do not auto start
          setIsBreak(true);
          setTimeLeft(5* 60); // break duration
        } else {
          // finish a break, prepare work session 
          setIsBreak(false);
          setTimeLeft(1 * 60);
        }
      }
    }
    
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, isBreak]);

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
    setIsPaused(false);
    setTimeLeft(breakMode ? 5 * 60 : 1 * 60);
  }

  const handleStart = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsRunning(false);
    setIsPaused(true);
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(isBreak ? 5 * 60 : 1 * 60);
  };

  const handleResume = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  

  return ( 
    <div>
      <header className='app-header'>
        <h1>Studying Smiski</h1>
      </header>
      <p>
       Study and collect Smiskis  
      </p>
      <div className="container" style={{position: 'relative'}}>
        <div
        className="background-box"
        style={{
          backgroundImage: `url(${bgsmiski})`,
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          padding: `2rem`,
          position: 'relative', 
        }}
        >
          
          <div className="home-content">
            <div>
            {showMenu && (
              <div className="menu-panel">
                <div className='menu-panel'>
                  <h3>Menu</h3>
                  <p>Menu to buy Smiski!</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="home-controls">
            <div className="coin-display">
              <img
              src={coinIcon}
              alt="Coin"
              className="coin-icon"
              onClick={() => setShowShopMenu(true)}
              style={{ cursor: 'pointer' }}
              />
              <span className="coint-count">{coins}</span>
            </div>

            <button className='image-button' onClick={() => setShowCollectionMenu(true)}>
              <img src={menuIcon} alt="Menu" className='menu-icon' />
            </button>
          </div>

          <p className ={`encouragement-text ${!isRunning ? "hidden" : ""}`}>
            { encouragement }
          </p>

          <h1 className="home-timer">{formatTime(timeLeft)}</h1>

          {!isRunning && !isPaused && (
            <button className="home-button large-button" onClick={handleStart}>
              Start
            </button>
          )}
        
          {isRunning && (
            <div className='button-group'>
            <button className="home-button small-button" onClick={handleStop}>
              Stop 
            </button>
            <button className="home-button small-button" onClick={handlePause}>
              Pause 
            </button>
            </div>
          )}
          {isPaused && (
            <button className="home-button large-button" onClick={handleResume}>
              Resume 
            </button>
          )}
        </div>
      </div>
    </div>
    {showShopMenu && (
  <div className="shop-overlay">
    <div className="shop-container">
      <button className="close-button" onClick={() => setShowShopMenu(false)}>×</button>
      <h2>Buy a Smiski</h2>
      <div className="item-grid">
        {smiskiImages.map((imgSrc, index) => (
          <div className="shop-item" key={index}>
            <img src={imgSrc} alt={`Smiski ${index + 1}`} />
            <p></p>
            <span className="item-cost"> 20 coins</span>
          </div>
        ))}
      </div>
    </div>
  </div>
)}

    {showCollectionMenu && (
  <div className="shop-overlay">
    <div className="shop-container">
      <button className="close-button" onClick={() => setShowCollectionMenu(false)}>×</button>
      <h2>Your Smiski Collection</h2>
      <div className="item-grid">
        {[1, 2, 3, 4].map((id) => (
          <div className="shop-item" key={id}>
            <img src={smiskiImages[id - 1]} alt={`Smiski ${id}`} />
            <p>Smiski #{id}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
)}
    </div>
  );
}

export default App;


// the solution 
<div
  className="button-group"
  style={{
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    minHeight: '48px'  // consistent height for all buttons
  }}
>
  <button
    className="home-button large-button"
    onClick={handleStart}
    style={{ opacity: (!isRunning && !isPaused) ? 1 : 0, pointerEvents: (!isRunning && !isPaused) ? 'auto' : 'none' }}
  >
    Start
  </button>

  <button
    className="home-button small-button"
    onClick={handleStop}
    style={{ opacity: isRunning ? 1 : 0, pointerEvents: isRunning ? 'auto' : 'none' }}
  >
    Stop
  </button>

  <button
    className="home-button small-button"
    onClick={handlePause}
    style={{ opacity: isRunning ? 1 : 0, pointerEvents: isRunning ? 'auto' : 'none' }}
  >
    Pause
  </button>

  <button
    className="home-button large-button"
    onClick={handleResume}
    style={{ opacity: isPaused ? 1 : 0, pointerEvents: isPaused ? 'auto' : 'none' }}
  >
    Resume
  </button>
</div>
