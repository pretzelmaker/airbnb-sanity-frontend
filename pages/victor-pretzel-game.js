import { useState, useEffect } from 'react'
import Link from 'next/link'

const VictorPretzelGame = () => {
  const [score, setScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [pretzelPosition, setPretzelPosition] = useState({ x: 50, y: 20 })
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && gameStarted) {
      setGameOver(true)
    }
  }, [timeLeft, gameStarted, gameOver])

  const startGame = () => {
    setScore(0)
    setTimeLeft(30)
    setGameStarted(true)
    setGameOver(false)
    movePretzel()
  }

  const movePretzel = () => {
    const newX = Math.random() * 80 + 10
    const newY = Math.random() * 70 + 10
    setPretzelPosition({ x: newX, y: newY })
  }

  const catchPretzel = () => {
    if (gameStarted && !gameOver) {
      setScore(score + 1)
      movePretzel()
    }
  }

  return (
    <div className="game-container">
      <div className="game-header">
        <Link href="/">
          <a className="back-link">← Back to Home</a>
        </Link>
        <h1>🥨 Victor's Pretzel Catch Game 🥨</h1>
        <p>Created by Victor Pretzel</p>
      </div>

      <div className="game-stats">
        <div className="stat">
          <span className="stat-label">Score:</span>
          <span className="stat-value">{score}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Time Left:</span>
          <span className="stat-value">{timeLeft}s</span>
        </div>
      </div>

      {!gameStarted && !gameOver && (
        <div className="game-start">
          <h2>Welcome to Victor's Pretzel Catch!</h2>
          <p>Click on the pretzels as fast as you can!</p>
          <p>You have 30 seconds to catch as many pretzels as possible.</p>
          <button onClick={startGame} className="game-button start-button">
            Start Game
          </button>
        </div>
      )}

      {gameStarted && !gameOver && (
        <div className="game-board">
          <div
            className="pretzel"
            style={{
              left: `${pretzelPosition.x}%`,
              top: `${pretzelPosition.y}%`,
            }}
            onClick={catchPretzel}
          >
            🥨
          </div>
        </div>
      )}

      {gameOver && (
        <div className="game-over">
          <h2>Game Over!</h2>
          <p className="final-score">Final Score: {score}</p>
          <p className="score-message">
            {score === 0 && "Better luck next time!"}
            {score > 0 && score < 10 && "Not bad for a first try!"}
            {score >= 10 && score < 20 && "Great job catching those pretzels!"}
            {score >= 20 && score < 30 && "Amazing! You're a pretzel master!"}
            {score >= 30 && "LEGENDARY! Victor would be proud!"}
          </p>
          <button onClick={startGame} className="game-button restart-button">
            Play Again
          </button>
        </div>
      )}

      <style jsx>{`
        .game-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
          color: white;
        }

        .game-header {
          text-align: center;
          margin-bottom: 20px;
          position: relative;
        }

        .back-link {
          position: absolute;
          left: 0;
          top: 0;
          color: white;
          text-decoration: none;
          font-size: 18px;
          padding: 10px 20px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          transition: background 0.3s;
        }

        .back-link:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .game-header h1 {
          font-size: 48px;
          margin: 20px 0 10px 0;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .game-header p {
          font-size: 20px;
          margin: 0;
          opacity: 0.9;
        }

        .game-stats {
          display: flex;
          justify-content: center;
          gap: 40px;
          margin-bottom: 30px;
        }

        .stat {
          background: rgba(255, 255, 255, 0.2);
          padding: 15px 30px;
          border-radius: 15px;
          font-size: 24px;
          backdrop-filter: blur(10px);
        }

        .stat-label {
          font-weight: 300;
          margin-right: 10px;
        }

        .stat-value {
          font-weight: 700;
          font-size: 32px;
        }

        .game-start,
        .game-over {
          text-align: center;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 60px;
          max-width: 600px;
          margin: 50px auto;
        }

        .game-start h2,
        .game-over h2 {
          font-size: 36px;
          margin-bottom: 20px;
        }

        .game-start p {
          font-size: 20px;
          margin: 10px 0;
        }

        .final-score {
          font-size: 48px;
          font-weight: bold;
          margin: 20px 0;
          color: #ffd700;
        }

        .score-message {
          font-size: 24px;
          margin: 20px 0;
        }

        .game-button {
          padding: 20px 50px;
          font-size: 24px;
          background: linear-gradient(135deg, rgb(255, 56, 92) 20%, rgb(189, 30, 89));
          color: white;
          border: none;
          border-radius: 15px;
          cursor: pointer;
          margin-top: 30px;
          transition: transform 0.2s, box-shadow 0.2s;
          font-weight: 600;
        }

        .game-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
        }

        .game-button:active {
          transform: translateY(0);
        }

        .game-board {
          position: relative;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          height: 500px;
          max-width: 900px;
          margin: 0 auto;
          overflow: hidden;
          border: 3px solid rgba(255, 255, 255, 0.3);
        }

        .pretzel {
          position: absolute;
          font-size: 60px;
          cursor: pointer;
          transition: transform 0.1s;
          user-select: none;
        }

        .pretzel:hover {
          transform: scale(1.2);
        }

        .pretzel:active {
          transform: scale(0.9);
        }
      `}</style>
    </div>
  )
}

export default VictorPretzelGame
