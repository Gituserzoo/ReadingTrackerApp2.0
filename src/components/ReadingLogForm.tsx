import { useState } from 'react';

interface Props {
  user: string;
}

export default function ReadingLogForm({ user }: Props) {
  const [book, setBook] = useState('');
  const [startPage, setStartPage] = useState('');
  const [endPage, setEndPage] = useState('');
  const [pagesRead, setPagesRead] = useState(0);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const start = parseInt(startPage, 10);
    const end = parseInt(endPage, 10);

    if (!book || isNaN(start) || isNaN(end) || end < start) {
      alert('Please enter valid data.');
      return;
    }

    const pages = end - start;
    setPagesRead(pages);

    console.log({
      user,
      book,
      startPage: start,
      endPage: end,
      pagesRead: pages,
      date: new Date().toLocaleDateString(),
    });

    // You can later connect this to Supabase here

    // Clear form
    setBook('');
    setStartPage('');
    setEndPage('');
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

      <button type="submit">Submit</button>

      {pagesRead > 0 && <p>You read {pagesRead} pages!</p>}
    </form>
  );
}

