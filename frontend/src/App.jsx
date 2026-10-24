
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import ReportIssue from "./pages/ReportIssue";
import MyIssues from "./pages/MyIssues";
import TrackIssues from "./pages/TrackIssues";
import MapView from "./pages/MapView";
import Analytics from "./pages/Analytics";


function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="app">

      {/* ================= SIDEBAR ================= */}

      <aside className="sidebar">

        <div className="brand">
          <div className="brand-icon">🏙️</div>

          <div>
            <h2>Smart Civic</h2>
            <span>Issue Management</span>
          </div>
        </div>


        <nav className="navigation">

          {/* Dashboard */}

          <button
            className="nav-item active"
            onClick={() => navigate("/")}
          >
            ▣ Dashboard
          </button>


          {/* Report Issue */}

          <button
            className="nav-item"
            onClick={() => navigate("/report-issue")}
          >
            ＋ Report Issue
          </button>


          {/* My Issues */}

          <button
            className="nav-item"
            onClick={() => navigate("/my-issues")}
          >
            ☰ My Issues
          </button>


          {/* Track Issues */}

          <button
            className="nav-item"
            onClick={() => navigate("/track-issues")}
          >
            📍 Track Issues
          </button>


          {/* Map View */}

          <button
            className="nav-item"
            onClick={() => navigate("/map-view")}
          >
            ◉ Map View
          </button>


          {/* Analytics */}

          <button
            className="nav-item"
            onClick={() => navigate("/analytics")}
          >
            ▥ Analytics
          </button>

        </nav>


        {/* Bottom navigation */}

        <div className="sidebar-bottom">

          <button className="nav-item">
            ⚙ Settings
          </button>

          <button className="nav-item">
            ↪ Logout
          </button>

        </div>

      </aside>



      {/* ================= MAIN CONTENT ================= */}

      <main className="main-content">


        {/* TOP BAR */}

        <header className="topbar">

          <div>

            <p className="breadcrumb">
              Dashboard
            </p>

            <h1>
              Smart Civic Dashboard
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

              <strong>
                Citizen
              </strong>

              <span>
                Resident
              </span>

            </div>

          </div>

        </header>



        {/* ================= WELCOME ================= */}

        <section className="welcome">

          <div>

            <span className="welcome-label">
              CIVIC SERVICES
            </span>

            <h2>
              Welcome to Smart Civic System
            </h2>

            <p>
              Report, track and monitor civic issues in your community.
            </p>

          </div>


          <button
            className="primary-button"
            onClick={() => navigate("/report-issue")}
          >
            ＋ Report New Issue
          </button>

        </section>



        {/* ================= STATISTICS ================= */}

        <section className="stats-grid">


          {/* Total Issues */}

          <div className="stat-card">

            <div className="stat-icon blue">
              ▣
            </div>

            <div>

              <span>
                Total Issues
              </span>

              <strong>
                24
              </strong>

              <small>
                All reported issues
              </small>

            </div>

          </div>



          {/* Pending */}

          <div className="stat-card">

            <div className="stat-icon orange">
              ◷
            </div>

            <div>

              <span>
                Pending
              </span>

              <strong>
                08
              </strong>

              <small>
                Waiting for action
              </small>

            </div>

          </div>



          {/* Resolved */}

          <div className="stat-card">

            <div className="stat-icon green">
              ✓
            </div>

            <div>

              <span>
                Resolved
              </span>

              <strong>
                12
              </strong>

              <small>
                Successfully completed
              </small>

            </div>

          </div>



          {/* High Priority */}

          <div className="stat-card">

            <div className="stat-icon red">
              !
            </div>

            <div>

              <span>
                High Priority
              </span>

              <strong>
                04
              </strong>

              <small>
                Needs attention
              </small>

            </div>

          </div>

        </section>



        {/* ================= RECENT ISSUES ================= */}

        <section className="content-grid">


          <div className="panel issues-panel">

            <div className="panel-header">

              <div>

                <h3>
                  Recent Civic Issues
                </h3>

                <p>
                  Latest reports from the community
                </p>

              </div>


              <button
                className="view-button"
                onClick={() => navigate("/my-issues")}
              >
                View All →
              </button>

            </div>



            <div className="issue-list">


              <div className="issue">

                <div className="issue-icon road">
                  🛣️
                </div>

                <div className="issue-info">

                  <strong>
                    Road Damage
                  </strong>

                  <span>
                    Main Road, Ward 12
                  </span>

                </div>

                <span className="status pending">
                  Pending
                </span>

              </div>



              <div className="issue">

                <div className="issue-icon light">
                  💡
                </div>

                <div className="issue-info">

                  <strong>
                    Street Light Not Working
                  </strong>

                  <span>
                    Gandhi Nagar
                  </span>

                </div>

                <span className="status progress">
                  In Progress
                </span>

              </div>



              <div className="issue">

                <div className="issue-icon garbage">
                  🗑️
                </div>

                <div className="issue-info">

                  <strong>
                    Garbage Collection
                  </strong>

                  <span>
                    Market Area
                  </span>

                </div>

                <span className="status resolved">
                  Resolved
                </span>

              </div>



              <div className="issue">

                <div className="issue-icon water">
                  💧
                </div>

                <div className="issue-info">

                  <strong>
                    Water Leakage
                  </strong>

                  <span>
                    Station Road
                  </span>

                </div>

                <span className="status pending">
                  Pending
                </span>

              </div>


            </div>

          </div>



          {/* ================= QUICK ACTIONS ================= */}

          <div className="panel quick-panel">

            <div className="panel-header">

              <div>

                <h3>
                  Quick Actions
                </h3>

                <p>
                  Common civic services
                </p>

              </div>

            </div>



            {/* Report */}

            <button
              className="quick-action"
              onClick={() => navigate("/report-issue")}
            >

              <span>
                📝
              </span>

              <div>

                <strong>
                  Report an Issue
                </strong>

                <small>
                  Submit a new civic complaint
                </small>

              </div>

              <b>
                →
              </b>

            </button>



            {/* Track */}

            <button
              className="quick-action"
              onClick={() => navigate("/track-issues")}
            >

              <span>
                📍
              </span>

              <div>

                <strong>
                  Track Issue
                </strong>

                <small>
                  Check your complaint status
                </small>

              </div>

              <b>
                →
              </b>

            </button>



            {/* Map */}

            <button
              className="quick-action"
              onClick={() => navigate("/map-view")}
            >

              <span>
                🗺️
              </span>

              <div>

                <strong>
                  View Civic Map
                </strong>

                <small>
                  Explore reported issues
                </small>

              </div>

              <b>
                →
              </b>

            </button>

          </div>

        </section>



        {/* ================= CHARTS ================= */}

        <section className="bottom-grid">


          {/* Activity */}

          <div className="panel activity-panel">

            <div className="panel-header">

              <div>

                <h3>
                  Issue Activity
                </h3>

                <p>
                  Overview of issue resolution
                </p>

              </div>

            </div>



            <div className="chart">

              <div className="chart-bars">

                <div style={{ height: "45%" }}></div>

                <div style={{ height: "65%" }}></div>

                <div style={{ height: "50%" }}></div>

                <div style={{ height: "80%" }}></div>

                <div style={{ height: "60%" }}></div>

                <div style={{ height: "90%" }}></div>

                <div style={{ height: "72%" }}></div>

              </div>


              <div className="chart-labels">

                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>

              </div>

            </div>

          </div>



          {/* Status */}

          <div className="panel status-panel">

            <div className="panel-header">

              <div>

                <h3>
                  Issue Status
                </h3>

                <p>
                  Current distribution
                </p>

              </div>

            </div>



            <div className="status-summary">

              <div className="circle">

                <strong>
                  24
                </strong>

                <span>
                  Total
                </span>

              </div>



              <div className="status-legend">

                <p>

                  <i className="dot pending-dot"></i>

                  Pending

                  <b>
                    8
                  </b>

                </p>


                <p>

                  <i className="dot progress-dot"></i>

                  In Progress

                  <b>
                    4
                  </b>

                </p>


                <p>

                  <i className="dot resolved-dot"></i>

                  Resolved

                  <b>
                    12
                  </b>

                </p>

              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}



/* =========================================================
   ROUTING
   ========================================================= */

function App() {

  return (

    <BrowserRouter>

      <Routes>


        {/* Dashboard */}

        <Route
          path="/"
          element={<Dashboard />}
        />


        {/* Report Issue */}

        <Route
          path="/report-issue"
          element={<ReportIssue />}
        />


        {/* My Issues */}

        <Route
          path="/my-issues"
          element={<MyIssues />}
        />


        {/* Track Issues */}

        <Route
          path="/track-issues"
          element={<TrackIssues />}
        />


        {/* Map View */}

        <Route
          path="/map-view"
          element={<MapView />}
        />


        {/* Analytics */}

        <Route
          path="/analytics"
          element={<Analytics />}
        />


      </Routes>

    </BrowserRouter>

  );
}


export default App;