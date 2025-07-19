import { useState } from 'react';

interface Props {
  user: string;
  onEntrySaved?: () => void;
}

export default function ReadingLogForm({ user, onEntrySaved }: Props) {
  const [book, setBook] = useState('');
  const [startPage, setStartPage] = useState('');
  const [endPage, setEndPage] = useState('');
  const [pagesRead, setPagesRead] = useState(0);
  const [logDate, setLogDate] = useState(() => new Date().toISOString().split('T')[0]);

  


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const start = parseInt(startPage, 10);
    const end = parseInt(endPage, 10);

    if (!book || isNaN(start) || isNaN(end) || end < start) {
      alert('Please enter valid data.');
      return;
    }

    const pages = end - start;
    setPagesRead(pages);

    const payload = {
      user,
      book_title: book,
      start_page: start,
      end_page: end,
      pages_read: pages,
      date: logDate,
    };

    try {
      const res = await fetch(
        'https://qzqxlgjnrgetzufseagz.supabase.co/rest/v1/reading_logs',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            Prefer: 'return=representation',
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error('Failed to insert data into Supabase');

      // Refresh recent entries in parent
      onEntrySaved?.();

      // Clear form
      setBook('');
      setStartPage('');
      setEndPage('');
    } catch (err) {
      console.error(err);
      alert('Error saving to Supabase. Check console.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="reading-form">
      <h2>Log Reading for {user}</h2>

      <div>
        <label>Book Title:</label><br />
        <input value={book} onChange={e => setBook(e.target.value)} required />
      </div>

      <div>
        <label>Start Page:</label><br />
        <input type="number" value={startPage} onChange={e => setStartPage(e.target.value)} required />
      </div>

      <div>
        <label>End Page:</label><br />
        <input type="number" value={endPage} onChange={e => setEndPage(e.target.value)} required />
      </div>
      <div>
  <label>Date:</label><br />
  <input
    type="date"
    value={logDate}
    onChange={e => setLogDate(e.target.value)}
    required
  />
</div>


      <button type="submit">Submit</button>

      {pagesRead > 0 && <p>You read {pagesRead} pages!</p>}
    </form>
  );
}


