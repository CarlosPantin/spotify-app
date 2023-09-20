import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TopTracks.css";

function TopTracks({ token }) {
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    if (token) {
      fetchTopTracks(token);
    }
  }, [token]);

  const fetchTopTracks = (accessToken) => {
    axios
      .get("https://api.spotify.com/v1/me/top/tracks", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          limit: 20, 
        },
      })
      .then((response) => {
        const tracks = response.data.items;
        setTopTracks(tracks);
      })
      .catch((error) => {
        console.error("Error fetching top tracks:", error);
      });
  };

  return (
    <div className="top-tracks">
      <h2>Your Top Tracks</h2>
      <div className="top-tracks-list">
        {topTracks.map((track) => (
          <div key={track.id} className="top-track">
            <img
              src={track.album.images[0].url}
              alt={track.name}
              className="track-image"
            />
            <div className="track-details">
              <p className="track-name">{track.name}</p>
              <p className="track-artist">
                {track.artists.map((artist) => artist.name).join(", ")}
              </p>
              <p className="track-album">{track.album.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopTracks;
