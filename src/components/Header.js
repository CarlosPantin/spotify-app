import React from "react";
import "./Header.css";

function Header({
  token,
  onLogout,
  onLogin,
  onShowPlaylists,
  onBackToProfile,
  onShowTopArtists, 
  onShowTopTracks, 
}) {
  return (
    <header className="App-header">
      <h1>Spotify React</h1>
      <div className="top-right-buttons">
        {token ? (
          <>
            <button className="top-button" onClick={onShowPlaylists}>
              View Playlists
            </button>
            <button className="top-button" onClick={onBackToProfile}>
              Profile
            </button>
            <button className="top-button" onClick={onShowTopArtists}>
              Top Artists
            </button>
            <button className="top-button" onClick={onShowTopTracks}>
              Top Tracks
            </button>
            <button className="top-button" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <a className="top-button" onClick={onLogin}>
            Login to Spotify
          </a>
        )}
      </div>
    </header>
  );
}

export default Header;
