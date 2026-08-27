import { useState, useEffect } from "react"
import Link from "next/link"

const PretzelQuest = () => {
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [gameStarted, setGameStarted] = useState(false)
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 })
  const [pretzelPos, setPretzelPos] = useState({ x: 4, y: 4 })
  const [obstacles, setObstacles] = useState([])
  const [moves, setMoves] = useState(0)
  const [gameWon, setGameWon] = useState(false)

  const gridSize = 5

  // Initialize game
  useEffect(() => {
    if (gameStarted) {
      generateObstacles()
    }
  }, [level, gameStarted])

  const generateObstacles = () => {
    const newObstacles = []
    const obstacleCount = Math.min(level + 2, 8)
    
    for (let i = 0; i < obstacleCount; i++) {
      let x, y
      do {
        x = Math.floor(Math.random() * gridSize)
        y = Math.floor(Math.random() * gridSize)
      } while (
        (x === 0 && y === 0) || // Not on player start
        (x === pretzelPos.x && y === pretzelPos.y) || // Not on pretzel
        newObstacles.some(obs => obs.x === x && obs.y === y) // Not on another obstacle
      )
      newObstacles.push({ x, y })
    }
    setObstacles(newObstacles)
  }

  const startGame = () => {
    setGameStarted(true)
    setPlayerPos({ x: 0, y: 0 })
    setPretzelPos({ x: gridSize - 1, y: gridSize - 1 })
    setMoves(0)
    setGameWon(false)
  }

  const resetGame = () => {
    setScore(0)
    setLevel(1)
    setGameStarted(false)
    setPlayerPos({ x: 0, y: 0 })
    setPretzelPos({ x: gridSize - 1, y: gridSize - 1 })
    setObstacles([])
    setMoves(0)
    setGameWon(false)
  }

  const nextLevel = () => {
    setLevel(level + 1)
    setPlayerPos({ x: 0, y: 0 })
    setPretzelPos({ x: gridSize - 1, y: gridSize - 1 })
    setMoves(0)
    setGameWon(false)
  }

  const movePlayer = (dx, dy) => {
    if (gameWon) return

    const newX = playerPos.x + dx
    const newY = playerPos.y + dy

    // Check boundaries
    if (newX < 0 || newX >= gridSize || newY < 0 || newY >= gridSize) return

    // Check obstacles
    if (obstacles.some(obs => obs.x === newX && obs.y === newY)) return

    setPlayerPos({ x: newX, y: newY })
    setMoves(moves + 1)

    // Check if reached pretzel
    if (newX === pretzelPos.x && newY === pretzelPos.y) {
      setGameWon(true)
      const levelScore = Math.max(100 - moves * 2, 50)
      setScore(score + levelScore)
    }
  }

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!gameStarted || gameWon) return

      switch(e.key) {
        case 'ArrowUp':
          e.preventDefault()
          movePlayer(0, -1)
          break
        case 'ArrowDown':
          e.preventDefault()
          movePlayer(0, 1)
          break
        case 'ArrowLeft':
          e.preventDefault()
          movePlayer(-1, 0)
          break
        case 'ArrowRight':
          e.preventDefault()
          movePlayer(1, 0)
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [gameStarted, playerPos, gameWon, moves])

  const getCellContent = (x, y) => {
    if (playerPos.x === x && playerPos.y === y) return "🧑"
    if (pretzelPos.x === x && pretzelPos.y === y) return "🥨"
    if (obstacles.some(obs => obs.x === x && obs.y === y)) return "🧱"
    return ""
  }

  return (
    <div className="game-page">
      <div className="game-header">
        <Link href="/games">
          <button className="back-button">← Back to Games</button>
        </Link>
        <h1>Pretzel Quest</h1>
        <p className="game-creator">Created by Victor Pretzel</p>
      </div>

      <div className="game-stats">
        <div className="stat">
          <span className="stat-label">Score:</span>
          <span className="stat-value">{score}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Level:</span>
          <span className="stat-value">{level}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Moves:</span>
          <span className="stat-value">{moves}</span>
        </div>
        <button className="reset-button" onClick={resetGame}>
          Reset Game
        </button>
      </div>

      {!gameStarted ? (
        <div className="win-message">
          <h2>🥨 Welcome to Pretzel Quest! 🥨</h2>
          <p>Navigate through obstacles to reach the golden pretzel!</p>
          <button className="play-again-button" onClick={startGame}>
            Start Game
          </button>
        </div>
      ) : gameWon ? (
        <div className="win-message">
          <h2>🎉 Level Complete! 🎉</h2>
          <p>You completed level {level} in {moves} moves!</p>
          <p>Score: +{Math.max(100 - moves * 2, 50)} points</p>
          <button className="play-again-button" onClick={nextLevel}>
            Next Level
          </button>
        </div>
      ) : null}

      {gameStarted && (
        <div style={{ margin: '0 auto', maxWidth: '500px' }}>
          <div className="quest-grid">
            {Array.from({ length: gridSize }).map((_, y) => (
              <div key={y} className="quest-row">
                {Array.from({ length: gridSize }).map((_, x) => (
                  <div key={`${x}-${y}`} className="quest-cell">
                    {getCellContent(x, y)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="game-instructions">
        <h3>How to Play:</h3>
        <ul>
          <li>Use arrow keys to move your character (🧑)</li>
          <li>Navigate around obstacles (🧱) to reach the pretzel (🥨)</li>
          <li>Complete levels in fewer moves for higher scores</li>
          <li>Each level adds more obstacles!</li>
        </ul>
      </div>

      <style jsx>{`
        .quest-grid {
          display: flex;
          flex-direction: column;
          gap: 5px;
          background-color: #f8f8f8;
          padding: 20px;
          border-radius: 12px;
          margin-bottom: 30px;
        }

        .quest-row {
          display: flex;
          gap: 5px;
          justify-content: center;
        }

        .quest-cell {
          width: 70px;
          height: 70px;
          background-color: white;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          transition: background-color 0.2s ease;
        }

        .quest-cell:hover {
          background-color: #f0f0f0;
        }
      `}</style>
    </div>
  )
}

export default PretzelQuest
