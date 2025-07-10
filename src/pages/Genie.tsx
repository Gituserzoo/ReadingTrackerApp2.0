import { useState, useEffect } from 'react';
import ReadingLogForm from '../components/ReadingLogForm';

export default function Genie() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: `You are a concise assistant that answers in 80 words or fewer. You are empathetic when necessary and avoid sounding too much like an AI model, sound human within reason. You do not punt requests and give thoughtful answers. Today's date is ${new Date().toDateString()}.`,
            },
            { role: 'user', content: question },
          ],
          temperature: 0.7,
        }),
      });

      const data = await res.json();
      const response = data.choices?.[0]?.message?.content?.trim();
      if (response) {
        setAnswer(response);
        const id = setTimeout(() => {
          setQuestion('');
          setAnswer('');
        }, 30000);
        setTimeoutId(id);
      } else {
        setAnswer('Something went wrong. Try again.');
      }
    } catch (err) {
      console.error(err);
      setAnswer('Failed to fetch answer.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  // Inject weather widget script once
  useEffect(() => {
    const existingScript = document.getElementById('commonninja-script');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://cdn.commoninja.com/sdk/latest/commonninja.js';
      script.id = 'commonninja-script';
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div
      className="page-content"
      style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '90vh',
      }}
    >
      {/* AMA Box (Left) */}
      <div
        style={{
          position: 'absolute',
          left: '14rem',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(255,255,255,0.95)',
          padding: '2.25rem',
          borderRadius: '10px',
          maxWidth: '460px',
          zIndex: 1,
        }}
      >
        <h2>AMA. Answers disappear.</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Ask me anything..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={3}
            style={{ width: '95%', padding: '0.5rem', fontSize: '1rem' }}
          />
          <button
            type="submit"
            style={{ marginTop: '0.5rem', padding: '0.5rem 1rem', fontSize: '1rem' }}
          >
            Ask
          </button>
        </form>
        {loading && <p>Loading...</p>}
        {answer && (
          <div
            style={{
              marginTop: '1rem',
              background: '#eee',
              padding: '0.75rem',
              borderRadius: '6px',
            }}
          >
            <strong>Answer:</strong> <br />
            {answer}
          </div>
        )}
      </div>

      {/* Reading Log (Center) */}
      <div className="reading-log-container">
        <div className="reading-log-box">
          <h1 style={{ marginTop: 0 }}>Genie's Reading Log</h1>
          <ReadingLogForm user="Genie" />
        </div>
      </div>

      {/* Weather Widget (Right) */}
      <div
        style={{
          position: 'absolute',
          right: '14rem',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(255,255,255,0.95)',
          padding: '1rem',
          borderRadius: '10px',
          width: '280px',
          maxHeight: '90vh',
          overflow: 'auto',
          zIndex: 1,
        }}
      >
        <h2 style={{ textAlign: 'center', marginTop: '10px', fontWeight: 'bold' }}>Weather</h2>
        <div
          id="weather-widget-container"
          className="commonninja_component pid-33681ccb-64cd-48f9-bcbf-a25a92b794b0"
        ></div>
      </div>
    </div>
  );
}

