import React from "react";
import { useNavigate } from "react-router-dom";

function Analytics() {
  const navigate = useNavigate();

  const categories = [
    { name: "Road Damage", value: 42 },
    { name: "Street Lights", value: 28 },
    { name: "Garbage", value: 20 },
    { name: "Water Issues", value: 15 },
    { name: "Drainage", value: 10 },
  ];

  return (
    <div className="app">

      <aside className="sidebar">

        <div className="brand">

          <div className="brand-icon">
            🏙️
          </div>

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
            className="nav-item active"
            onClick={() => navigate("/analytics")}
          >
            ▥ Analytics
          </button>

        </nav>


        <div className="sidebar-bottom">

          <button className="nav-item">
            ⚙ Settings
          </button>

          <button className="nav-item">
            ↪ Logout
          </button>

        </div>

      </aside>


      <main className="main-content">

        <header className="topbar">

          <div>

            <p className="breadcrumb">
              Dashboard / Analytics
            </p>

            <h1>
              Civic Analytics
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
              DATA INSIGHTS
            </span>

            <h2>
              Civic Issue Analytics
            </h2>

            <p>
              Monitor issue trends, priorities and resolution performance.
            </p>

          </div>

        </section>


        <section className="analytics-stat-grid">

          <div className="analytics-stat-card">

            <div className="analytics-stat-icon blue">
              ▣
            </div>

            <div>
              <span>Total Issues</span>
              <strong>24</strong>
              <small>+12% this month</small>
            </div>

          </div>


          <div className="analytics-stat-card">

            <div className="analytics-stat-icon orange">
              ◷
            </div>

            <div>
              <span>Pending</span>
              <strong>08</strong>
              <small>33% of total issues</small>
            </div>

          </div>


          <div className="analytics-stat-card">

            <div className="analytics-stat-icon green">
              ✓
            </div>

            <div>
              <span>Resolved</span>
              <strong>12</strong>
              <small>50% resolution rate</small>
            </div>

          </div>


          <div className="analytics-stat-card">

            <div className="analytics-stat-icon red">
              !
            </div>

            <div>
              <span>High Priority</span>
              <strong>04</strong>
              <small>Needs attention</small>
            </div>

          </div>

        </section>


        <section className="analytics-dashboard-grid">


          <div className="analytics-panel-large">

            <div className="panel-header">

              <div>
                <h3>Issues by Category</h3>
                <p>Distribution of reported civic issues</p>
              </div>

              <button className="view-button">
                This Month ▾
              </button>

            </div>


            <div className="category-bars">

              {categories.map((item) => (

                <div
                  className="category-bar-item"
                  key={item.name}
                >

                  <div className="category-bar-label">

                    <span>
                      {item.name}
                    </span>

                    <strong>
                      {item.value}
                    </strong>

                  </div>


                  <div className="category-track">

                    <div
                      className="category-fill"
                      style={{
                        width: `${item.value * 2}%`,
                      }}
                    ></div>

                  </div>

                </div>

              ))}

            </div>

          </div>



          <div className="analytics-panel">

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


            <div className="analytics-circle">

              <div>

                <strong>
                  24
                </strong>

                <span>
                  Total
                </span>

              </div>

            </div>


            <div className="analytics-legend">

              <div>
                <i className="dot pending-dot"></i>
                <span>Pending</span>
                <strong>8</strong>
              </div>

              <div>
                <i className="dot progress-dot"></i>
                <span>In Progress</span>
                <strong>4</strong>
              </div>

              <div>
                <i className="dot resolved-dot"></i>
                <span>Resolved</span>
                <strong>12</strong>
              </div>

            </div>

          </div>

        </section>


        <section className="analytics-panel activity-analytics">

          <div className="panel-header">

            <div>

              <h3>
                Weekly Issue Activity
              </h3>

              <p>
                Number of reports received during the week
              </p>

            </div>

          </div>


          <div className="analytics-chart">

            <div className="analytics-bars">

              <div>
                <span style={{ height: "45%" }}></span>
                <small>Mon</small>
              </div>

              <div>
                <span style={{ height: "65%" }}></span>
                <small>Tue</small>
              </div>

              <div>
                <span style={{ height: "55%" }}></span>
                <small>Wed</small>
              </div>

              <div>
                <span style={{ height: "80%" }}></span>
                <small>Thu</small>
              </div>

              <div>
                <span style={{ height: "60%" }}></span>
                <small>Fri</small>
              </div>

              <div>
                <span style={{ height: "90%" }}></span>
                <small>Sat</small>
              </div>

              <div>
                <span style={{ height: "72%" }}></span>
                <small>Sun</small>
              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Analytics;