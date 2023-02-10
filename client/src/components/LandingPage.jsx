import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="landing">
      <h1>Dogs Breeds PI</h1>
      <Link to="/home">
        <button className="btnLan"> ENTER </button>
      </Link>
    </div>
  );
}