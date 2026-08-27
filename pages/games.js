import Link from 'next/link'

const games = [
  {
    id: 1,
    name: "Pretzel Spinner",
    description: "Spin the pretzel and stop it at the target angle by Victor Pretzel",
    path: "/games/pretzel-spinner",
    difficulty: "Easy",
    players: "1 Player"
  }
]

const Games = () => {
  return (
    <div className="games-container">
      <div className="games-header">
        <h1>Mini Games</h1>
        <p>Choose a game to play</p>
      </div>

      <div className="games-grid">
        {games.map(game => (
          <Link href={game.path} key={game.id}>
            <div className="game-card">
              <h2>{game.name}</h2>
              <p className="game-description">{game.description}</p>
              <div className="game-meta">
                <span className="game-difficulty">{game.difficulty}</span>
                <span className="game-players">{game.players}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Games
