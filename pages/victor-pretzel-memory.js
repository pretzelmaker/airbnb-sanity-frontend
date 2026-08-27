import { useState, useEffect } from 'react'
import Link from 'next/link'

const VictorPretzelMemory = () => {
  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [matchedCards, setMatchedCards] = useState([])
  const [moves, setMoves] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameWon, setGameWon] = useState(false)
  const [bestScore, setBestScore] = useState(null)

  const emojis = ['🥨', '🍞', '🥖', '🥐', '🧈', '🍪', '🥯', '🎂']

  useEffect(() => {
    const savedBest = localStorage.getItem('pretzelMemoryBest')
    if (savedBest) {
      setBestScore(parseInt(savedBest))
    }
  }, [])

  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      setGameWon(true)
      if (!bestScore || moves < bestScore) {
        setBestScore(moves)
        localStorage.setItem('pretzelMemoryBest', moves.toString())
      }
    }
  }, [matchedCards, cards, moves, bestScore])

  const initializeGame = () => {
    const shuffledCards = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        flipped: false,
      }))
    setCards(shuffledCards)
    setFlippedCards([])
    setMatchedCards([])
    setMoves(0)
    setGameStarted(true)
    setGameWon(false)
  }

  const handleCardClick = (cardId) => {
    if (
      flippedCards.length === 2 ||
      flippedCards.includes(cardId) ||
      matchedCards.includes(cardId)
    ) {
      return
    }

    const newFlippedCards = [...flippedCards, cardId]
    setFlippedCards(newFlippedCards)

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1)
      const [firstCard, secondCard] = newFlippedCards
      const firstEmoji = cards.find((c) => c.id === firstCard).emoji
      const secondEmoji = cards.find((c) => c.id === secondCard).emoji

      if (firstEmoji === secondEmoji) {
        setMatchedCards([...matchedCards, firstCard, secondCard])
        setFlippedCards([])
      } else {
        setTimeout(() => {
          setFlippedCards([])
        }, 1000)
      }
    }
  }

  const isCardFlipped = (cardId) => {
    return flippedCards.includes(cardId) || matchedCards.includes(cardId)
  }

  return (
    <div className="game-container">
      <div className="game-header">
        <Link href="/">
          <a className="back-link">← Back to Home</a>
        </Link>
        <h1>🥨 Victor's Pretzel Memory Match 🥨</h1>
        <p>Created by Victor Pretzel</p>
      </div>

      <div className="game-stats">
        <div className="stat">
          <span className="stat-label">Moves:</span>
          <span className="stat-value">{moves}</span>
        </div>
        {bestScore && (
          <div className="stat">
            <span className="stat-label">Best:</span>
            <span className="stat-value">{bestScore}</span>
          </div>
        )}
      </div>

      {!gameStarted && (
        <div className="game-start">
          <h2>Welcome to Pretzel Memory Match!</h2>
          <p>Match all the pretzel-themed pairs!</p>
          <p>Try to complete the game in as few moves as possible.</p>
          <button onClick={initializeGame} className="game-button start-button">
            Start Game
          </button>
        </div>
      )}

      {gameStarted && !gameWon && (
        <div className="game-board">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`card ${isCardFlipped(card.id) ? 'flipped' : ''}`}
              onClick={() => handleCardClick(card.id)}
            >
              <div className="card-inner">
                <div className="card-front">?</div>
                <div className="card-back">{card.emoji}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {gameWon && (
        <div className="game-over">
          <h2>🎉 Congratulations! 🎉</h2>
          <p className="final-score">Completed in {moves} moves!</p>
          <p className="score-message">
            {moves <= 10 && "INCREDIBLE! You have an amazing memory!"}
            {moves > 10 && moves <= 15 && "Excellent work! Victor is impressed!"}
            {moves > 15 && moves <= 20 && "Great job! You're a memory master!"}
            {moves > 20 && "Well done! Keep practicing to improve!"}
          </p>
          <button onClick={initializeGame} className="game-button restart-button">
            Play Again
          </button>
        </div>
      )}

      <style jsx>{`
        .game-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
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
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }

        .card {
          aspect-ratio: 1;
          perspective: 1000px;
          cursor: pointer;
        }

        .card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }

        .card.flipped .card-inner {
          transform: rotateY(180deg);
        }

        .card-front,
        .card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 15px;
          font-size: 48px;
          font-weight: bold;
        }

        .card-front {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .card-back {
          background: white;
          transform: rotateY(180deg);
        }

        .card:hover .card-front {
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }

        @media (max-width: 768px) {
          .game-board {
            gap: 10px;
            padding: 10px;
          }

          .card-front,
          .card-back {
            font-size: 36px;
          }
        }
      `}</style>
    </div>
  )
}

export default VictorPretzelMemory
