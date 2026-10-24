import React, { useState } from "react";

function ReportIssue() {
  const [form, setForm] = useState({
    category: "",
    description: "",
    latitude: "",
    longitude: "",
    severity: "medium",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Issue submitted successfully!");
  };

  return (
    <div className="report-page">
      <div className="report-header">
        <p className="breadcrumb">Dashboard / Report Issue</p>

        <h1>Report a Civic Issue</h1>

        <p>
          Help improve your community by reporting a civic problem.
        </p>
      </div>

      <div className="report-card">
        <form onSubmit={handleSubmit}>

          <div className="form-section">
            <h2>Issue Details</h2>
            <p>Provide information about the civic issue.</p>
          </div>

          <div className="form-grid">

            <div className="form-group">
              <label>Issue Category</label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
              >
                <option value="">Select category</option>
                <option value="Road Damage">Road Damage</option>
                <option value="Street Light">Street Light</option>
                <option value="Garbage">Garbage</option>
                <option value="Water Leakage">Water Leakage</option>
                <option value="Drainage">Drainage</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Severity</label>

              <select
                name="severity"
                value={form.severity}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the civic issue..."
              rows="5"
              required
            />
          </div>

          <div className="location-section">

            <h3>Issue Location</h3>

            <p>Enter the location where the issue occurred.</p>

            <div className="form-grid">

              <div className="form-group">
                <label>Latitude</label>

                <input
                  type="number"
                  step="any"
                  name="latitude"
                  value={form.latitude}
                  onChange={handleChange}
                  placeholder="17.3850"
                  required
                />
              </div>

              <div className="form-group">
                <label>Longitude</label>

                <input
                  type="number"
                  step="any"
                  name="longitude"
                  value={form.longitude}
                  onChange={handleChange}
                  placeholder="78.4867"
                  required
                />
              </div>

            </div>
          </div>

          <div className="form-actions">

            <button
              type="button"
              className="cancel-button"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="submit-button"
            >
              Submit Issue
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default ReportIssue;