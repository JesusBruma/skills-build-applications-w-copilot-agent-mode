import React, { useEffect, useState } from 'react';

const API_BASE = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = `${API_BASE}/api/users/`;
    console.log('Fetching users from:', url);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log('Users data:', data);
        setUsers(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching users:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="card octofit-card">
      <div className="card-header bg-dark text-white d-flex align-items-center">
        <span className="me-2">👤</span>
        <h4 className="mb-0">Users</h4>
      </div>
      <div className="card-body p-0">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-dark" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : users.length === 0 ? (
          <div className="alert alert-info m-3">No users found.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover octofit-table mb-0">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Team</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id || user.id}>
                    <td>{index + 1}</td>
                    <td>
                      <span className="fw-semibold">{user.username}</span>
                    </td>
                    <td>
                      <a href={`mailto:${user.email}`} className="text-decoration-none">{user.email}</a>
                    </td>
                    <td>
                      {user.team
                        ? <span className="badge bg-success">{user.team}</span>
                        : <span className="text-muted">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="card-footer text-muted small">
        {users.length} user{users.length !== 1 ? 's' : ''} registered
      </div>
    </div>
  );
}

export default Users;
