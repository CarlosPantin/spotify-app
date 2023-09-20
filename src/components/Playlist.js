import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PlayList.css"; 

function Playlist({ token, onBackToProfile }) {
  const [userPlaylists, setUserPlaylists] = useState([]);

  useEffect(() => {
    if (token) {
      fetchUserPlaylists(token);
    }
  }, [token]);

  const fetchUserPlaylists = (accessToken) => {
    axios
      .get("https://api.spotify.com/v1/me/playlists", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const playlists = response.data.items;
        setUserPlaylists(playlists);
      })
      .catch((error) => {
        console.error("Error fetching user playlists:", error);
      });
  };

  return (
    <div className="playlist-list">
      <h2>Your Playlists</h2>
      <div className="playlist-cards">
        {userPlaylists.map((playlist) => (
          <div key={playlist.id} className="playlist-card">
            <img
              src={playlist.images[0].url}
              alt={playlist.name}
              className="playlist-cover"
            />
            <h3 className="playlist-title">{playlist.name}</h3>
            <p className="playlist-owner">By {playlist.owner.display_name}</p>
            <p className="playlist-track-count">
              {playlist.tracks.total} tracks
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Playlist;
