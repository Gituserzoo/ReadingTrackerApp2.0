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
  <div className="page-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <h1>Welcome to Woodland Readers!</h1>

    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px',
      minHeight: '300px',
      justifyContent: 'center',
    }}>
      <button onClick={handleJoke} style={{ fontSize: '20px', padding: '10px 20px' }}>
        Generate Joke
      </button>
      <div style={{ minHeight: '60px', maxWidth: '500px', background: joke ? 'rgba(255,255,255,0.85)' : 'none', padding: joke ? '1rem' : '0', borderRadius: '8px', color: 'black' }}>
        {loadingJoke ? <p>Loading joke...</p> : joke && (<><strong>Joke:</strong><br /> {joke}</>)}
      </div>

      <button onClick={handleCompliment} style={{ fontSize: '20px', padding: '10px 20px' }}>
        Generate Compliment
      </button>
      <div style={{ minHeight: '60px', maxWidth: '500px', background: compliment ? 'rgba(255,255,255,0.85)' : 'none', padding: compliment ? '1rem' : '0', borderRadius: '8px', color: 'black' }}>
        {loadingCompliment ? <p>Loading compliment...</p> : compliment && (<><strong>Compliment:</strong><br /> {compliment}</>)}
      </div>
    </div>
  </div>
);
}
