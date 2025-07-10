import ReadingLogForm from '../components/ReadingLogForm';

export default function Adam() {
  return (
    <div className="page-content">
      <div className="reading-log-container">
        <div className="reading-log-box">
          <h1 style={{ marginTop: 0 }}>Adam's Reading Log</h1>
          <ReadingLogForm user="Adam" />
        </div>
      </div>
    </div>
  );
}
