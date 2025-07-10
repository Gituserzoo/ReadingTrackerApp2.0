import ReadingLogForm from '../components/ReadingLogForm';

export default function Genie() {
  return (
    <div className="page-content">
      <div className="reading-log-container">
        <div className="reading-log-box">
          <h1 style={{ marginTop: 0 }}>Genie's Reading Log</h1>
          <ReadingLogForm user="Genie" />
        </div>
      </div>
    </div>
  );
}

