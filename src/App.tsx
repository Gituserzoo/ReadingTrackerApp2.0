import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Genie from './pages/Genie';
import Adam from './pages/Adam';
import Stats from './pages/Stats';
import Mountains from './pages/Mountains';
import './index.css';


export default function App() {
  return (
    <div className="background-wrapper">
      <Router>
        <nav
          style={{
            padding: '1rem',
            background: '#222',
            display: 'flex',
            justifyContent: 'center',
            gap: '1.5rem',
          }}
        >
          <NavLink
            to="/"
            style={({ isActive }) => ({
              color: '#fff',
              textDecoration: isActive ? 'underline' : 'none',
            })}
          >
            Home
          </NavLink>

          <NavLink
            to="/genie"
            style={({ isActive }) => ({
              color: '#fff',
              textDecoration: isActive ? 'underline' : 'none',
            })}
          >
            Genie
          </NavLink>

          <NavLink
            to="/adam"
            style={({ isActive }) => ({
              color: '#fff',
              textDecoration: isActive ? 'underline' : 'none',
            })}
          >
            Adam
          </NavLink>

          <NavLink
            to="/stats"
            style={({ isActive }) => ({
              color: '#fff',
              textDecoration: isActive ? 'underline' : 'none',
            })}
          >
            Stats
          </NavLink>

          <NavLink
            to="/mountains"
            style={({ isActive }) => ({
              color: '#fff',
              textDecoration: isActive ? 'underline' : 'none',
            })}
          >
            Mountains
          </NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/genie" element={<Genie />} />
          <Route path="/adam" element={<Adam />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/mountains" element={<Mountains />} />
        </Routes>
      </Router>
    </div>
  );
}
