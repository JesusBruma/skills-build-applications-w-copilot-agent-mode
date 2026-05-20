import React, { useEffect, useState } from 'react';

const API_URL = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/';

const difficultyBadge = (level) => {
  const lower = (level || '').toLowerCase();
  if (lower === 'easy')   return <span className="badge badge-easy text-white">{level}</span>;
  if (lower === 'medium') return <span className="badge badge-medium">{level}</span>;
  if (lower === 'hard')   return <span className="badge badge-hard text-white">{level}</span>;
  return <span className="badge bg-secondary">{level}</span>;
};

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = API_URL;
    console.log('Fetching workouts from:', url);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log('Workouts data:', data);
        setWorkouts(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching workouts:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="card octofit-card">
      <div className="card-header bg-danger text-white d-flex align-items-center">
        <span className="me-2">💪</span>
        <h4 className="mb-0">Workouts</h4>
      </div>
      <div className="card-body p-0">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : workouts.length === 0 ? (
          <div className="alert alert-info m-3">No workouts found.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover octofit-table mb-0">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Difficulty</th>
                </tr>
              </thead>
              <tbody>
                {workouts.map((workout, index) => (
                  <tr key={workout._id || workout.id}>
                    <td>{index + 1}</td>
                    <td><span className="fw-semibold">{workout.name}</span></td>
                    <td className="text-muted">{workout.description}</td>
                    <td>{difficultyBadge(workout.difficulty)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="card-footer text-muted small">
        {workouts.length} workout{workouts.length !== 1 ? 's' : ''} available
      </div>
    </div>
  );
}

export default Workouts;
