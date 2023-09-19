// Header.js
import React from "react";

function Header({ token, onLogout, onLogin }) {
  return (
    <header className="App-header">
      <h1>Spotify React</h1>
      {!token ? (
        <a onClick={onLogin}>Login to Spotify</a>
      ) : (
        <button onClick={onLogout}>Logout</button>
      )}
    </header>
  );
}

export default Header;
