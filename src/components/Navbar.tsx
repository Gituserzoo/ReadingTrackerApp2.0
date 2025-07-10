import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
      <Link to="/">Home Page</Link>
      <Link to="/genie">Genie</Link>
      <Link to="/adam">Adam</Link>
      <Link to="/stats">Stats</Link>
      <Link to="/mountains">Mountains are cool</Link>
    </nav>
  )
}
