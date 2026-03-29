import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [journals, setJournals] = useState([]);

  const fetchData = async () => {
    const res = await axios.get("http://127.0.0.1:50084/journals");
    setJournals(res.data);
  };


  const addEntry = async () => {
    await axios.post("http://127.0.0.1:50084/journals", { text });
    setText("");
    fetchData();
  };

  const deleteEntry = async (id) => {
    await axios.delete(`http://127.0.0.1:50084/journals/${id}`);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="page">
      <div className="journal-cover">
        <div className="cover-stripe" />
        <div className="cover-content">
          <span className="cover-label">My Journal</span>
          <h2 className="cover-title">Journal App <span className="pen-icon">✒️</span></h2>
          <p className="cover-date">{new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
        </div>
      </div>

      <div className="journal-body">
        <div className="entry-composer">
          <div className="composer-label">New Entry</div>
          <div className="composer-row">
            <textarea
              className="composer-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What's on your mind today..."
              rows={3}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) addEntry();
              }}
            />
          </div>
          <div className="composer-footer">
            <span className="composer-hint">Ctrl + Enter to save</span>
            <button className="add-btn" onClick={addEntry}>
              <span className="add-btn-icon">+</span> Add Entry
            </button>
          </div>
        </div>

        <div className="entries-section">
          <div className="entries-header">
            <span className="entries-count">{journals.length} {journals.length === 1 ? "entry" : "entries"}</span>
            <div className="entries-divider" />
          </div>

          <ul className="entries-list">
            {journals.map((j, index) => (
              <li className="entry-card" key={j._id} style={{ animationDelay: `${index * 60}ms` }}>
                <div className="entry-index">{String(journals.length - index).padStart(2, "0")}</div>
                {/* <div className="entry-text">{j.text}</div> */}
                <div className="entry-content">
                  <div className="entry-date">
                    {new Date(j.date).toLocaleString("en-US", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </div>
                  <div className="entry-text">{j.text}</div>
                </div>
                <button className="delete-btn" onClick={() => deleteEntry(j._id)} title="Delete entry">
                  <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14H6L5 6" />
                    <path d="M10 11v6M14 11v6" />
                    <path d="M9 6V4h6v2" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>

          {journals.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">📖</div>
              <p>Your journal is empty.<br />Write your first entry above.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;