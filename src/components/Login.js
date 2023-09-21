import React from "react";
import "./Login.css";

function Login({ onLogin }) {
  return (
    <div className="login-container">
      <div className="login-content">
        <h2>Welcome to my Spotify React</h2>
        <p>Your top tracks and top artists all year long!</p>
        <button className="login-button" onClick={onLogin}>
          Login with Spotify
        </button>
      </div>
    </div>
  );
}

export default Login;
