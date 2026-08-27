import Link from 'next/link'

const NavBar = () => {
  return (
    <div className="nav">
      <div className="nav-content">
        <div className="logo"></div>
        <div className="nav-links">
          <Link href="/games">
            <a className="nav-link">Games</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NavBar