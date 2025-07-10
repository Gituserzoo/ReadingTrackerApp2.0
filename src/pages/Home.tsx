import { useState } from 'react';
import { generateJoke } from '../utils/generateJokeNew';
import { generateCompliment } from '../utils/generateComplimentNew';

export default function Home() {
  const [joke, setJoke] = useState('');
  const [compliment, setCompliment] = useState('');
  const [loadingJoke, setLoadingJoke] = useState(false);
  const [loadingCompliment, setLoadingCompliment] = useState(false);

  async function handleJoke() {
    setLoadingJoke(true);
    const j = await generateJoke();
    setJoke(j);
    setLoadingJoke(false);
  }

  async function handleCompliment() {
    setLoadingCompliment(true);
    const c = await generateCompliment();
    setCompliment(c);
    setLoadingCompliment(false);
  }

  return (
    <div className="page-content">
      <h1>Welcome to Woodland Readers!</h1>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={handleJoke} style={{ fontSize: '20px', padding: '10px 20px' }}>
          Generate Joke
        </button>
        {loadingJoke && <p>Loading joke...</p>}
        {joke && (
          <div style={{
            background: 'rgba(255,255,255,0.85)',
            color: 'black',
            padding: '1rem',
            borderRadius: '8px',
            marginTop: '1rem',
            maxWidth: '500px'
          }}>
            <strong>Joke:</strong><br /> {joke}
          </div>
        )}
      </div>

      <div>
        <button onClick={handleCompliment} style={{ fontSize: '20px', padding: '10px 20px' }}>
          Generate Compliment
        </button>
        {loadingCompliment && <p>Loading compliment...</p>}
        {compliment && (
          <div style={{
            background: 'rgba(255,255,255,0.85)',
            color: 'black',
            padding: '1rem',
            borderRadius: '8px',
            marginTop: '1rem',
            maxWidth: '500px'
          }}>
            <strong>Compliment:</strong><br /> {compliment}
          </div>
        )}
      </div>
    </div>
  );
}
