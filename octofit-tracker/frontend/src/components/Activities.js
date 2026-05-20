import React, { useEffect, useState } from 'react';

const API_BASE = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = `${API_BASE}/api/activities/`;
    console.log('Fetching activities from:', url);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log('Activities data:', data);
        setActivities(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching activities:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="card octofit-card">
      <div className="card-header bg-primary text-white d-flex align-items-center">
        <span className="me-2">🏃</span>
        <h4 className="mb-0">Activities</h4>
      </div>
      <div className="card-body p-0">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : activities.length === 0 ? (
          <div className="alert alert-info m-3">No activities found.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover octofit-table mb-0">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>Activity Type</th>
                  <th>Duration (min)</th>
                  <th>Calories</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((a, index) => (
                  <tr key={a._id || a.id}>
                    <td>{index + 1}</td>
                    <td><span className="fw-semibold">{a.username}</span></td>
                    <td><span className="badge bg-info text-dark">{a.activity_type}</span></td>
                    <td>{a.duration} min</td>
                    <td>{a.calories} kcal</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="card-footer text-muted small">
        {activities.length} record{activities.length !== 1 ? 's' : ''} found
      </div>
    </div>
  );
}

export default Activities;
