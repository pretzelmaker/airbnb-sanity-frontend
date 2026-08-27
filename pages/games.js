import Link from "next/link"

const Games = () => {
  const games = [
    {
      id: 1,
      name: "Pretzel Match",
      description: "A memory matching game by Victor Pretzel",
      path: "/games/pretzel-match",
      difficulty: "Easy",
      players: "1 Player"
    }
  ]

  return (
    <div className="games-container">
      <h1>Game Selection</h1>
      <p className="games-subtitle">Choose a game to play</p>
      
      <div className="games-grid">
        {games.map((game) => (
          <Link href={game.path} key={game.id}>
            <div className="game-card">
              <h2>{game.name}</h2>
              <p className="game-description">{game.description}</p>
              <div className="game-info">
                <span className="game-badge">{game.difficulty}</span>
                <span className="game-badge">{game.players}</span>
              </div>
              <button className="play-button">Play Now</button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Games
