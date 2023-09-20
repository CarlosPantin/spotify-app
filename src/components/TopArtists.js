import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TopArtists.css";

function TopArtists({ token }) {
  const [topArtists, setTopArtists] = useState([]);

  useEffect(() => {
    if (token) {
      fetchTopArtists(token);
    }
  }, [token]);

  const fetchTopArtists = (accessToken) => {
    axios
      .get("https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=10", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const artists = response.data.items;
        setTopArtists(artists);
      })
      .catch((error) => {
        console.error("Error fetching top artists:", error);
      });
  };

  return (
    <div className="top-artists">
      <h2>Your Top Artists</h2>
      <div className="artist-cards">
        {topArtists.map((artist) => (
          <div key={artist.id} className="artist-card">
            <img
              src={artist.images[0].url}
              alt={artist.name}
              className="artist-image"
            />
            <h3 className="artist-name">{artist.name}</h3>
            <p className="artist-genres">
              Genres: {artist.genres.join(", ")}
            </p>
            <p className="artist-popularity">
              Popularity: {artist.popularity}
            </p>
           
            <a
              className="artist-spotify-link"
              href={artist.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Spotify
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopArtists;
