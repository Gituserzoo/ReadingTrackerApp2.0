import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Genie from './pages/Genie';
import Adam from './pages/Adam';
import Stats from './pages/Stats';
import Mountains from './pages/Mountains';
import Navbar from './components/Navbar'; // ✅ Reusable Navbar
import './index.css';

export default function App() {
  return (
    <div className="background-wrapper">
      <Router>
        <Navbar /> {/* ✅ Now using shared navbar */}
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
