import React from "react";
import { useNavigate } from "react-router-dom";

function MapView() {
  const navigate = useNavigate();

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
            className="nav-item"
            onClick={() => navigate("/track-issues")}
          >
            📍 Track Issues
          </button>

          <button
            className="nav-item active"
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
              Dashboard / Map View
            </p>

            <h1>
              Civic Issue Map
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
              LOCATION MONITORING
            </span>

            <h2>
              Civic Issues Near You
            </h2>

            <p>
              Explore reported civic problems by geographical location.
            </p>

          </div>

        </section>


        <section className="map-dashboard">

          <div className="map-main-card">

            <div className="map-toolbar">

              <div>

                <h3>
                  Interactive Issue Map
                </h3>

                <p>
                  Reported civic issues
                </p>

              </div>

              <button>
                ⛶ Full Screen
              </button>

            </div>


            <div className="professional-map">

              <div className="map-grid-lines"></div>

              <div className="map-road road-horizontal one"></div>
              <div className="map-road road-horizontal two"></div>
              <div className="map-road road-vertical one"></div>
              <div className="map-road road-vertical two"></div>

              <div className="map-marker marker-a">
                <span>!</span>
              </div>

              <div className="map-marker marker-b">
                <span>💡</span>
              </div>

              <div className="map-marker marker-c">
                <span>💧</span>
              </div>

              <div className="map-marker marker-d">
                <span>🗑️</span>
              </div>

              <div className="map-center-location">
                <span>●</span>
                Your Location
              </div>

            </div>

          </div>


          <div className="map-side-card">

            <h3>
              Issue Categories
            </h3>

            <p>
              Active reports on the map
            </p>


            <div className="map-category">
              <span>🛣️</span>
              <div>
                <strong>Road Damage</strong>
                <small>6 reports</small>
              </div>
            </div>


            <div className="map-category">
              <span>💡</span>
              <div>
                <strong>Street Lights</strong>
                <small>5 reports</small>
              </div>
            </div>


            <div className="map-category">
              <span>🗑️</span>
              <div>
                <strong>Garbage</strong>
                <small>4 reports</small>
              </div>
            </div>


            <div className="map-category">
              <span>💧</span>
              <div>
                <strong>Water Issues</strong>
                <small>3 reports</small>
              </div>
            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default MapView;