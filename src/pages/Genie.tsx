import { useState, useEffect } from 'react';
import ReadingLogForm from '../components/ReadingLogForm';
import './Genie.css';

export default function Genie() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [loading, setLoading] = useState(false);
  const [recentEntries, setRecentEntries] = useState<any[]>([]);

  useEffect(() => {
    fetchRecentEntries();
  }, []);

  async function fetchRecentEntries() {
    try {
      const res = await fetch(
        'https://qzqxlgjnrgetzufseagz.supabase.co/rest/v1/reading_logs?user=eq.Genie&order=created_at.desc&limit=5',
        {
          headers: {
            apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
        }
      );
      const data = await res.json();
      setRecentEntries(data);
    } catch (error) {
      console.error('Failed to fetch recent entries:', error);
    }
  }

  async function handleDelete(id: number) {
    const password = prompt('Enter the delete password:');
    if (password !== import.meta.env.VITE_DELETE_PASSWORD) {
      alert('Incorrect password.');
      return;
    }

    const confirmDelete = confirm('Are you sure you want to delete this entry?');
    if (!confirmDelete) return;

    try {
      await fetch(`https://qzqxlgjnrgetzufseagz.supabase.co/rest/v1/reading_logs?id=eq.${id}`, {
        method: 'DELETE',
        headers: {
          apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
      });
      fetchRecentEntries();
    } catch (err) {
      console.error('Failed to delete entry:', err);
    }
  }

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

  useEffect(() => {
    const scriptId = 'weatherwidget-io-js';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://weatherwidget.io/js/widget.min.js';
      script.async = true;
      document.body.appendChild(script);
    } else {
      if ((window as any).__weatherwidget_init) {
        (window as any).__weatherwidget_init();
      }
    }
  }, []);

  return (
    <div className="page-content">
      {/* AMA Box */}
      <div className="ama-box">
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

      {/* Reading Log */}
      <div className="reading-log-container">
        <div className="reading-log-box">
          <h1 style={{ marginTop: 0 }}>Genie's Reading Log</h1>
          <ReadingLogForm user="Genie" onEntrySaved={fetchRecentEntries} />

          {/* Recent Entries */}
          <div
  style={{
    marginTop: '2rem',
    padding: '1rem',
    background: 'rgba(255, 255, 255, 0.92)',
    borderRadius: '10px',
    width: '100%',
    maxWidth: '420px',
    textAlign: 'center',
    boxSizing: 'border-box',
    paddingRight: '1.25rem', // Add a little extra space for scrollbar clearance
  }}
>

            <h3 style={{ marginBottom: '1rem' }}>Recent Entries</h3>
            {recentEntries.length === 0 ? (
              <p>No entries yet.</p>
            ) : (
          <div style={{ maxHeight: '160px', overflowY: 'auto', paddingRight: '4px' }}>
  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
    {recentEntries.map((entry) => (
      <li key={entry.id} style={{ marginBottom: '0.75rem', position: 'relative' }}>
        <strong>{entry.book_title}</strong> – {entry.end_page - entry.start_page} pages <br />
        <span style={{ fontSize: '0.9rem', color: '#555' }}>
  {new Date(entry.date + 'T12:00:00').toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })}
</span>

        <button
          onClick={() => handleDelete(entry.id)}
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            color: '#888',
            fontSize: '1rem',
          }}
          title="Delete entry"
        >
          🗑️
        </button>
      </li>
    ))}
  </ul>
</div>    
            )}
          </div>
        </div>
      </div>

      {/* Weather Widget */}
      <div className="weather-widget">
        <a
          className="weatherwidget-io"
          href="https://forecast7.com/en/39d74n104d99/denver/?unit=us"
          data-label_1="Genie's House"
          data-label_2="WEATHER"
          data-days="5"
          data-theme="sky"
        >
          Genie's House WEATHER
        </a>
      </div>
    </div>
  );
}

