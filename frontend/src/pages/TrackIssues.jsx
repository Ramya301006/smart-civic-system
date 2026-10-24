import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function TrackIssues() {
  const navigate = useNavigate();

  const [issueId, setIssueId] = useState("");
  const [searched, setSearched] = useState(false);

  const handleTrack = (e) => {
    e.preventDefault();

    if (issueId.trim()) {
      setSearched(true);
    }
  };

  return (
    <div className="app">

      <aside className="sidebar">

        <div className="brand">
          <div className="brand-icon">🏙️</div>

          <div>
            <h2>Smart Civic</h2>
            <span>Issue Management</span>
          </div>
        </div>

        <nav className="navigation">

          <button
            className="nav-item"
            onClick={() => navigate("/")}
          >
            ▣ Dashboard
          </button>

          <button
            className="nav-item"
            onClick={() => navigate("/report-issue")}
          >
            ＋ Report Issue
          </button>

          <button
            className="nav-item"
            onClick={() => navigate("/my-issues")}
          >
            ☰ My Issues
          </button>

          <button
            className="nav-item active"
            onClick={() => navigate("/track-issues")}
          >
            📍 Track Issues
          </button>

          <button
            className="nav-item"
            onClick={() => navigate("/map-view")}
          >
            ◉ Map View
          </button>

          <button
            className="nav-item"
            onClick={() => navigate("/analytics")}
          >
            ▥ Analytics
          </button>

        </nav>

        <div className="sidebar-bottom">
          <button className="nav-item">⚙ Settings</button>
          <button className="nav-item">↪ Logout</button>
        </div>

      </aside>


      <main className="main-content">

        <header className="topbar">

          <div>
            <p className="breadcrumb">
              Dashboard / Track Issues
            </p>

            <h1>
              Track Issues
            </h1>
          </div>

          <div className="user-area">

            <button className="notification">
              🔔
            </button>

            <div className="avatar">
              RS
            </div>

            <div>
              <strong>Citizen</strong>
              <span>Resident</span>
            </div>

          </div>

        </header>


        <section className="page-intro">

          <div>

            <span className="welcome-label">
              ISSUE TRACKING
            </span>

            <h2>
              Track Your Complaint
            </h2>

            <p>
              Monitor the current status and progress of your reported issue.
            </p>

          </div>

        </section>


        <section className="track-professional-card">

          <div className="track-icon-large">
            📍
          </div>

          <h2>
            Track Civic Issue
          </h2>

          <p>
            Enter your unique issue ID to see the latest status.
          </p>


          <form
            className="track-professional-form"
            onSubmit={handleTrack}
          >

            <input
              type="text"
              value={issueId}
              onChange={(e) => setIssueId(e.target.value)}
              placeholder="Enter Issue ID  •  CIV-1001"
            />

            <button type="submit">
              Track Issue →
            </button>

          </form>


          {searched && (

            <div className="tracking-result">

              <div className="tracking-header">

                <div>
                  <span>Issue ID</span>
                  <strong>{issueId}</strong>
                </div>

                <span className="status progress">
                  In Progress
                </span>

              </div>


              <div className="tracking-line">

                <div className="tracking-step completed">
                  <span>✓</span>
                  <strong>Submitted</strong>
                  <small>18 Sep 2026</small>
                </div>

                <div className="tracking-step completed">
                  <span>✓</span>
                  <strong>Verified</strong>
                  <small>18 Sep 2026</small>
                </div>

                <div className="tracking-step active-step">
                  <span>3</span>
                  <strong>In Progress</strong>
                  <small>Current status</small>
                </div>

                <div className="tracking-step">
                  <span>4</span>
                  <strong>Resolved</strong>
                  <small>Pending</small>
                </div>

              </div>

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default TrackIssues;