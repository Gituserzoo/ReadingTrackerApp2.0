import { useEffect, useState } from 'react';
import './Stats.css';


type ReadingLog = {
  id: number;
  user: string;
  book_title: string;
  start_page: number;
  end_page: number;
  pages_read: number;
  date: string | null;
  created_at: string;
};

type UserStats = {
  bookTotals: Record<string, number>;
  averagePages: number;
  maxPages: number;
  longestStreak: number;
};

export default function Stats() {
  const [logs, setLogs] = useState<ReadingLog[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('https://qzqxlgjnrgetzufseagz.supabase.co/rest/v1/reading_logs', {
        headers: {
          apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
      });
      const data = await res.json();
      setLogs(data);
    }
    fetchData();
  }, []);

  const getUserStats = (user: string): UserStats => {
    const userLogs = logs.filter((log) => log.user === user);
    const bookTotals: Record<string, number> = {};
    const dailyTotals: Record<string, number> = {};

    let prevDate: string | null = null;
    let currentStreak = 0;
    let longestStreak = 0;
    let maxPages = 0;

    userLogs.forEach((log) => {
      const book = log.book_title;
      const pages = log.pages_read ?? (log.end_page - log.start_page);
      const dateStr = log.date ?? new Date(log.created_at).toISOString().split('T')[0];

      // Total pages per book
      bookTotals[book] = (bookTotals[book] || 0) + pages;

      // Total pages per day
      dailyTotals[dateStr] = (dailyTotals[dateStr] || 0) + pages;

      // Max pages in one day
      if (dailyTotals[dateStr] > maxPages) maxPages = dailyTotals[dateStr];
    });

    // Average and streak
    const sortedDates = Object.keys(dailyTotals).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    const totalPages = Object.values(bookTotals).reduce((a, b) => a + b, 0);
    const averagePages = sortedDates.length ? Math.round(totalPages / sortedDates.length) : 0;

    sortedDates.forEach((dateStr) => {
      const pages = dailyTotals[dateStr];
      const date = new Date(dateStr);

      if (pages >= 20) {
        if (prevDate) {
          const prev = new Date(prevDate);
          const diff = (date.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);
          currentStreak = diff === 1 ? currentStreak + 1 : 1;
        } else {
          currentStreak = 1;
        }
        prevDate = dateStr;
        longestStreak = Math.max(longestStreak, currentStreak);
      } else {
        currentStreak = 0;
        prevDate = null;
      }
    });

    return { bookTotals, averagePages, maxPages, longestStreak };
  };

  const getMostReadBook = (bookTotals: Record<string, number>): string => {
  return Object.entries(bookTotals).reduce(
    (maxBook, [book, pages]) =>
      pages > (bookTotals[maxBook] || 0) ? book : maxBook,
    Object.keys(bookTotals)[0] || ''
  );
};

  const renderStatsBox = (user: string, stats: UserStats) => (
    <div style={{ background: 'rgba(255,255,255,0.95)', padding: '1rem', borderRadius: '10px', width: '300px', color: 'black',textAlign:'center', }}>
      <h2>{user}'s Stats</h2>
      <p>📖 <strong>{getMostReadBook(stats.bookTotals)}</strong>: {stats.bookTotals[getMostReadBook(stats.bookTotals)]} pages</p>
      <p>📈 Avg Pages/Day: <strong>{stats.averagePages}</strong></p>
      <p>📚 Max Pages in 1 Day: <strong>{stats.maxPages}</strong></p>
      <p>🔥 Streak (20+/day): <strong>{stats.longestStreak}</strong> days</p>
    </div>
  );

  const genieStats = getUserStats('Genie');
  const adamStats = getUserStats('Adam');

  return (
  <div className="page-content">
    <div>
      <div className="stat-box">
        {renderStatsBox('Genie', genieStats)}
      </div>
      <div className="book-list-box">
        <h4 style={{ marginBottom: '0.5rem' }}>Books Read</h4>
        <ul>
          {Object.entries(genieStats.bookTotals).map(([book, pages]) => (
            <li key={book}>{book} – {pages} pages</li>
          ))}
        </ul>
      </div>
    </div>

    <div>
      <div className="stat-box">
        {renderStatsBox('Adam', adamStats)}
      </div>
      <div className="book-list-box">
        <h4 style={{ marginBottom: '0.5rem' }}>Books Read</h4>
        <ul>
          {Object.entries(adamStats.bookTotals).map(([book, pages]) => (
            <li key={book}>{book} – {pages} pages</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

}
