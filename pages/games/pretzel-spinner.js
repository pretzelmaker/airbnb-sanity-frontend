import { useState, useEffect } from 'react'
import Link from 'next/link'

const PretzelSpinner = () => {
  const [rotation, setRotation] = useState(0)
  const [score, setScore] = useState(0)
  const [target, setTarget] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const [message, setMessage] = useState('')
  const [highScore, setHighScore] = useState(0)

  useEffect(() => {
    generateNewTarget()
  }, [])

  const generateNewTarget = () => {
    setTarget(Math.floor(Math.random() * 360))
    setMessage('')
  }

  const spin = () => {
    if (isSpinning) return
    
    setIsSpinning(true)
    setMessage('')
    
    const spinAmount = Math.floor(Math.random() * 360) + 720 // At least 2 full rotations
    const newRotation = rotation + spinAmount
    setRotation(newRotation)
    
    setTimeout(() => {
      const finalAngle = newRotation % 360
      const difference = Math.abs(finalAngle - target)
      const minDifference = Math.min(difference, 360 - difference)
      
      if (minDifference <= 10) {
        setScore(score + 1)
        setMessage('Perfect! 🥨')
        if (score + 1 > highScore) {
          setHighScore(score + 1)
        }
        setTimeout(() => generateNewTarget(), 1500)
      } else if (minDifference <= 30) {
        setMessage('Close! Try again')
      } else {
        setMessage('Too far! Starting over')
        setScore(0)
        setTimeout(() => generateNewTarget(), 1500)
      }
      
      setIsSpinning(false)
    }, 2000)
  }

  const reset = () => {
    setRotation(0)
    setScore(0)
    setIsSpinning(false)
    generateNewTarget()
  }

  return (
    <div className="game-page">
      <div className="game-header">
        <Link href="/games">
          <button className="back-button">← Back to Games</button>
        </Link>
        <h1>Pretzel Spinner</h1>
        <p>By Victor Pretzel</p>
      </div>

      <div className="game-stats">
        <div>Score: {score}</div>
        <div>High Score: {highScore}</div>
        <div>Target: {target}°</div>
      </div>

      <div className="game-instructions">
        <h3>How to Play:</h3>
        <p>Click SPIN to rotate the pretzel. Try to stop it at the target angle (±10°)!</p>
        <p>Get close (±30°) to keep playing. Miss by too much and you start over!</p>
      </div>

      <div className="spinner-container">
        <div className="target-indicator" style={{ transform: `rotate(${target}deg)` }}>
          <div className="target-line"></div>
        </div>
        <div 
          className="pretzel-spinner"
          style={{ 
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? 'transform 2s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'none'
          }}
        >
          🥨
        </div>
        <div className="center-dot"></div>
      </div>

      <div className="game-controls">
        <button 
          className="play-button" 
          onClick={spin}
          disabled={isSpinning}
        >
          {isSpinning ? 'Spinning...' : 'SPIN'}
        </button>
        <button className="reset-button" onClick={reset}>Reset Game</button>
      </div>

      {message && (
        <div className={`game-message ${message.includes('Perfect') ? 'win-message' : ''}`}>
          {message}
        </div>
      )}
    </div>
  )
}

export default PretzelSpinner
