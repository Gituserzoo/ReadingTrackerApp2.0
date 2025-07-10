import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-link">Home</NavLink>
      <NavLink to="/genie" className="nav-link">Genie</NavLink>
      <NavLink to="/adam" className="nav-link">Adam</NavLink>
      <NavLink to="/stats" className="nav-link">Stats</NavLink>
      <NavLink to="/mountains" className="nav-link">Mountains</NavLink>
    </nav>
  );
}
