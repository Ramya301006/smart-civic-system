import React from "react";
import { useNavigate } from "react-router-dom";

function MyIssues() {
  const navigate = useNavigate();

  const issues = [
    {
      id: "CIV-1001",
      title: "Road Damage",
      location: "Main Road, Ward 12",
      date: "18 Sep 2026",
      priority: "High",
      status: "Pending",
      icon: "🛣️",
    },
    {
      id: "CIV-1002",
      title: "Street Light Not Working",
      location: "Gandhi Nagar",
      date: "16 Sep 2026",
      priority: "Medium",
      status: "In Progress",
      icon: "💡",
    },
    {
      id: "CIV-1003",
      title: "Garbage Collection",
      location: "Market Area",
      date: "14 Sep 2026",
      priority: "Low",
      status: "Resolved",
      icon: "🗑️",
    },
    {
      id: "CIV-1004",
      title: "Water Leakage",
      location: "Station Road",
      date: "12 Sep 2026",
      priority: "High",
      status: "Pending",
      icon: "💧",
    },
  ];

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
            className="nav-item active"
            onClick={() => navigate("/my-issues")}
          >
            ☰ My Issues
          </button>

          <button
            className="nav-item"
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
              Dashboard / My Issues
            </p>

            <h1>
              My Issues
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
              CIVIC REPORTS
            </span>

            <h2>
              Your Reported Issues
            </h2>

            <p>
              View and monitor all civic issues reported by you.
            </p>
          </div>

          <button
            className="primary-button"
            onClick={() => navigate("/report-issue")}
          >
            ＋ Report New Issue
          </button>

        </section>


        <section className="stats-grid">

          <div className="stat-card">
            <div className="stat-icon blue">▣</div>
            <div>
              <span>Total Reports</span>
              <strong>04</strong>
              <small>Your submitted issues</small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon orange">◷</div>
            <div>
              <span>Pending</span>
              <strong>02</strong>
              <small>Awaiting action</small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">✓</div>
            <div>
              <span>Resolved</span>
              <strong>01</strong>
              <small>Successfully completed</small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon red">!</div>
            <div>
              <span>High Priority</span>
              <strong>02</strong>
              <small>Requires attention</small>
            </div>
          </div>

        </section>


        <section className="panel professional-table-panel">

          <div className="panel-header">

            <div>
              <h3>Reported Issues</h3>
              <p>
                Complete history of your civic complaints
              </p>
            </div>

            <button className="view-button">
              Filter Issues ▾
            </button>

          </div>


          <div className="professional-table">

            <div className="professional-table-header">

              <span>Issue</span>
              <span>Location</span>
              <span>Reported</span>
              <span>Priority</span>
              <span>Status</span>

            </div>


            {issues.map((issue) => (

              <div
                className="professional-table-row"
                key={issue.id}
              >

                <div className="table-issue">

                  <div className="table-issue-icon">
                    {issue.icon}
                  </div>

                  <div>
                    <strong>{issue.title}</strong>
                    <small>{issue.id}</small>
                  </div>

                </div>


                <span className="table-location">
                  📍 {issue.location}
                </span>


                <span>
                  {issue.date}
                </span>


                <span
                  className={`priority-badge ${issue.priority.toLowerCase()}`}
                >
                  {issue.priority}
                </span>


                <span
                  className={`status ${
                    issue.status === "Resolved"
                      ? "resolved"
                      : issue.status === "In Progress"
                      ? "progress"
                      : "pending"
                  }`}
                >
                  {issue.status}
                </span>

              </div>

            ))}

          </div>

        </section>

      </main>

    </div>
  );
}

export default MyIssues;