import React, { useState } from "react";
import GameOver from "./GameOver"
import Entity from "./Entity"
import Logs from "./Logs"

// ----------------------------------------------------------------------------------------------------------
// HELPER FUNCTIONS
// ----------------------------------------------------------------------------------------------------------

// Generate a random values in the range {min, max}
function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Create an attack log
function createLogAttack(isPlayer, damage) {
  return {
    isPlayer: isPlayer,
    isDamage: true,
    text: ` takes ${damage} damages`,
  };
}

// Create a healing log
function createLogHeal(healing) {
  return {
    isPlayer: true,
    isDamage: false,
    text: ` heal ${healing} life points`,
  };
}

function Game() {
  // ----------------------------------------------------------------------------------------------------------
  // STATES & VARIABLES
  // ----------------------------------------------------------------------------------------------------------

  const [playerHealth, setPlayerHealth] = useState(100);
  const [monsterHealth, setMonsterHealth] = useState(100);
  const [round, setRound] = useState(1);
  const [logs, setLogs] = useState([]);
  const [winner, setWinner] = useState(null);


  // Special
  const canSpecial = round % 3 === 0;

  // is Game Over?
  const isOver = winner !== null;

  // Game Over title
  const gameOver_title = 
  winner === "player" ? "You won!" : 
  winner === "monster" ? "You lose!" : "Draw";
  // ----------------------------------------------------------------------------------------------------------
  // BUTTONS EVENT FUNCTIONS
  // ----------------------------------------------------------------------------------------------------------

  // attack
  function handleAtk(){
    const playerAtk = getRandomValue(5, 12);
    const monsterAtk = getRandomValue(8, 15);

    const newHpM = Math.max(0, monsterHealth - playerAtk);
    const newHpP = Math.max(0, playerHealth - monsterAtk);

    setPlayerHealth(newHpP);
    setMonsterHealth(newHpM);

    addLogs([
      createLogAttack(false, playerAtk),
      createLogAttack(true, monsterAtk)
    ]);

    checkWinner(newHpP, newHpM);
  }
  
  // heal
  function handleHeal(){
    const playerHeal = getRandomValue(8, 15);
    const monsterAtk = getRandomValue(8, 15);
    
    const newHpP = Math.max(0, playerHealth + playerHeal - monsterAtk);
    const newHpM = monsterHealth;
    
    setPlayerHealth(newHpP);
    setMonsterHealth(newHpM);
    
    addLogs([
      createLogHeal(playerHeal),
      createLogAttack(true, monsterAtk)
    ]);

    checkWinner(newHpP, newHpM);
  }
  
  // special
  function handleSpec(){
    const playerSpec = getRandomValue(8, 25); 
    const monsterAtk = getRandomValue(8, 15);
    
    const newHpM = Math.max(0, monsterHealth - playerSpec);
    const newHpP = Math.max(0, playerHealth - monsterAtk);
    
    setPlayerHealth(newHpP);
    setMonsterHealth(newHpM);
    
    addLogs([
      createLogAttack(false, playerSpec),
      createLogAttack(true, monsterAtk)
    ]);

    checkWinner(newHpP, newHpM);
  }
  
  // surrender
  function handleSurrender(){
    setPlayerHealth(0);
    setWinner("monster");
  }

  // restart
  function handleRestart(){
    setPlayerHealth(100);
    setMonsterHealth(100);
    setRound(1);
    setLogs([]);
    setWinner(null);
  }

  // ----------------------------------------------------------------------------------------------------------
  // JSX FUNCTIONS
  // ----------------------------------------------------------------------------------------------------------

  // add new logs
  function addLogs(newEntries){
    setLogs((prev) => [...prev, ...newEntries]);
  }

  // check winner
  function checkWinner(HpP, HpM){
    if (HpP <= 0 && HpM <= 0) setWinner("draw");
    else if (HpP <= 0) setWinner("monster");
    else if (HpM <= 0) setWinner("player");
    else setRound((r) => r + 1);
  }
  // ----------------------------------------------------------------------------------------------------------
  // MAIN  TEMPLATE
  // ----------------------------------------------------------------------------------------------------------
  return (
  <>
    <Entity entityName="Monster" entityHealth={monsterHealth}/>
    <Entity entityName="Your" entityHealth={playerHealth}/>

    {isOver && (
      <GameOver title={gameOver_title} restartGame={handleRestart}/>
    )}

    {!isOver && (
      <section id="controls">
        <button onClick={handleAtk}>ATTACK</button>
        <button onClick={handleSpec} disabled={!canSpecial}>SPECIAL !</button>
        <button onClick={handleHeal}>HEAL</button>
        <button onClick={handleSurrender}>KILL YOURSELF</button>
      </section>
    )};

    {logs.length > 0 && <Logs logs={logs}/>}
  </>
  );
}

export default Game;
