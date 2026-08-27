import Link from "next/link"

const NavBar = () => {
  return (
    <div className="nav">
      <div className="nav-content">
        <Link href="/">
          <div className="logo"></div>
        </Link>
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