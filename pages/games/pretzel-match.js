import { useState, useEffect } from "react"
import Link from "next/link"

const PretzelMatch = () => {
  const [cards, setCards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState([])
  const [moves, setMoves] = useState(0)
  const [gameWon, setGameWon] = useState(false)

  // Card emojis - pretzel-themed
  const cardSymbols = ["🥨", "🍞", "🥖", "🧈", "🥐", "🥯", "🍪", "🧁"]

  // Initialize game
  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    // Create pairs of cards
    const cardPairs = [...cardSymbols, ...cardSymbols]
    // Shuffle cards
    const shuffled = cardPairs
      .map((symbol, index) => ({ id: index, symbol }))
      .sort(() => Math.random() - 0.5)
    
    setCards(shuffled)
    setFlipped([])
    setMatched([])
    setMoves(0)
    setGameWon(false)
  }

  const handleCardClick = (index) => {
    // Don't flip if already flipped or matched
    if (flipped.includes(index) || matched.includes(index)) return
    
    // Don't flip if two cards are already flipped
    if (flipped.length === 2) return

    const newFlipped = [...flipped, index]
    setFlipped(newFlipped)

    // Check for match when two cards are flipped
    if (newFlipped.length === 2) {
      setMoves(moves + 1)
      const [firstIndex, secondIndex] = newFlipped
      
      if (cards[firstIndex].symbol === cards[secondIndex].symbol) {
        // Match found
        setTimeout(() => {
          const newMatched = [...matched, firstIndex, secondIndex]
          setMatched(newMatched)
          setFlipped([])
          
          // Check if game is won
          if (newMatched.length === cards.length) {
            setGameWon(true)
          }
        }, 500)
      } else {
        // No match - flip back after delay
        setTimeout(() => {
          setFlipped([])
        }, 1000)
      }
    }
  }

  return (
    <div className="game-page">
      <div className="game-header">
        <Link href="/games">
          <button className="back-button">← Back to Games</button>
        </Link>
        <h1>Pretzel Match</h1>
        <p className="game-creator">Created by Victor Pretzel</p>
      </div>

      <div className="game-stats">
        <div className="stat">
          <span className="stat-label">Moves:</span>
          <span className="stat-value">{moves}</span>
        </div>
        <button className="reset-button" onClick={initializeGame}>
          New Game
        </button>
      </div>

      {gameWon && (
        <div className="win-message">
          <h2>🎉 Congratulations! 🎉</h2>
          <p>You won in {moves} moves!</p>
          <button className="play-again-button" onClick={initializeGame}>
            Play Again
          </button>
        </div>
      )}

      <div className="cards-grid">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`memory-card ${
              flipped.includes(index) || matched.includes(index) ? "flipped" : ""
            } ${matched.includes(index) ? "matched" : ""}`}
            onClick={() => handleCardClick(index)}
          >
            <div className="card-inner">
              <div className="card-front">?</div>
              <div className="card-back">{card.symbol}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="game-instructions">
        <h3>How to Play:</h3>
        <ul>
          <li>Click on cards to flip them over</li>
          <li>Find matching pairs of symbols</li>
          <li>Match all pairs to win the game</li>
          <li>Try to win in as few moves as possible!</li>
        </ul>
      </div>
    </div>
  )
}

export default PretzelMatch
