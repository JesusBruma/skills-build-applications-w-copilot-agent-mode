import React, { useEffect, useState } from 'react';

const API_URL = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = API_URL;
    console.log('Fetching teams from:', url);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log('Teams data:', data);
        setTeams(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching teams:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="card octofit-card">
      <div className="card-header bg-success text-white d-flex align-items-center">
        <span className="me-2">👥</span>
        <h4 className="mb-0">Teams</h4>
      </div>
      <div className="card-body p-0">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : teams.length === 0 ? (
          <div className="alert alert-info m-3">No teams found.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover octofit-table mb-0">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Team Name</th>
                  <th>Members</th>
                  <th>Size</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team, index) => {
                  const members = Array.isArray(team.members) ? team.members : [];
                  return (
                    <tr key={team._id || team.id}>
                      <td>{index + 1}</td>
                      <td><span className="fw-semibold">{team.name}</span></td>
                      <td>
                        {members.length > 0
                          ? members.map((m, i) => (
                              <span key={i} className="badge bg-secondary me-1">{m}</span>
                            ))
                          : <span className="text-muted">No members</span>}
                      </td>
                      <td><span className="badge bg-primary">{members.length}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="card-footer text-muted small">
        {teams.length} team{teams.length !== 1 ? 's' : ''} found
      </div>
    </div>
  );
}

export default Teams;
