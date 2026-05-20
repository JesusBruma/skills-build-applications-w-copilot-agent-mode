import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import logo from './octofitapp-small.png';
import './App.css';

function App() {
  return (
    <Router>
      <div className="page-wrapper">
        <nav className="navbar navbar-expand-lg octofit-navbar">
          <div className="container">
            <NavLink className="navbar-brand d-flex align-items-center" to="/">
              <img src={logo} alt="OctoFit logo" />
              OctoFit Tracker
            </NavLink>
            <button
              className="navbar-toggler border-light"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto gap-1">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/users">👤 Users</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/teams">👥 Teams</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/activities">🏃 Activities</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/leaderboard">🏆 Leaderboard</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/workouts">💪 Workouts</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container py-4">
          <Routes>
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/" element={
              <div className="hero-section text-center">
                <img src={logo} alt="OctoFit logo" style={{ height: 90, borderRadius: '50%', border: '3px solid rgba(255,255,255,0.6)', marginBottom: '1.5rem' }} />
                <h1>Welcome to OctoFit Tracker</h1>
                <p className="lead mt-2 mb-4">
                  Track activities, manage teams, and compete on the leaderboard.
                </p>
                <div className="d-flex justify-content-center gap-2 flex-wrap">
                  <NavLink to="/users" className="btn btn-light btn-lg fw-semibold">👤 Users</NavLink>
                  <NavLink to="/teams" className="btn btn-outline-light btn-lg">👥 Teams</NavLink>
                  <NavLink to="/activities" className="btn btn-outline-light btn-lg">🏃 Activities</NavLink>
                  <NavLink to="/leaderboard" className="btn btn-outline-light btn-lg">🏆 Leaderboard</NavLink>
                  <NavLink to="/workouts" className="btn btn-outline-light btn-lg">💪 Workouts</NavLink>
                </div>
              </div>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
