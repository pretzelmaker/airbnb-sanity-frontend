import Link from 'next/link'

const NavBar = () => {
  return (
    <div className="nav">
      <div className="nav-content">
        <Link href="/">
          <a>
            <div className="logo"></div>
          </a>
        </Link>
        <Link href="/victor-pretzel-game">
          <a className="game-link">🥨 Play Victor's Pretzel Game</a>
        </Link>
      </div>
    </div>
  )
}

export default NavBar