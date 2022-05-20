import React from "react";
import { Link } from "react-router-dom";
import "./styles/App.css";

import "./styles/App.css";
function App() {
  return (
    <div className="home-container">
      <div className="welcome-display">
        <h1 className="welcome-title">Aaron's Axes</h1>
        <Link to="/shop" className="welcome-link">
          <p>Find The Perfect Axe</p>
        </Link>
      </div>
    </div>
  );
}

export default App;
