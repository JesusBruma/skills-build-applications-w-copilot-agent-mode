import React, { useEffect, useState } from 'react';

const API_URL = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/';

const medalEmoji = (rank) => {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return rank;
};

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = API_URL;
    console.log('Fetching leaderboard from:', url);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log('Leaderboard data:', data);
        const sorted = (Array.isArray(data) ? data : data.results || [])
          .sort((a, b) => b.points - a.points);
        setEntries(sorted);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching leaderboard:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="card octofit-card">
      <div className="card-header bg-warning text-dark d-flex align-items-center">
        <span className="me-2">🏆</span>
        <h4 className="mb-0">Leaderboard</h4>
      </div>
      <div className="card-body p-0">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : entries.length === 0 ? (
          <div className="alert alert-info m-3">No leaderboard entries found.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover octofit-table mb-0">
              <thead className="table-dark">
                <tr>
                  <th>Rank</th>
                  <th>Team</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => (
                  <tr key={entry._id || entry.id} className={index === 0 ? 'table-warning fw-bold' : ''}>
                    <td className="text-center fs-5">{medalEmoji(index + 1)}</td>
                    <td><span className="fw-semibold">{entry.team}</span></td>
                    <td><span className="badge bg-success fs-6">{entry.points} pts</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="card-footer text-muted small">
        {entries.length} team{entries.length !== 1 ? 's' : ''} ranked
      </div>
    </div>
  );
}

export default Leaderboard;
