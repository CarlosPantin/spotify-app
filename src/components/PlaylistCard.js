import React from "react";

function PlaylistCard({ playlist }) {
  return (
    <div className="playlist-card">
      <img
        src={playlist.images[0].url}
        alt={playlist.name}
        className="playlist-cover"
      />
      <div className="playlist-info">
        <h3 className="playlist-title">{playlist.name}</h3>
        <p className="playlist-owner">By {playlist.owner.display_name}</p>
        <p className="playlist-track-count">{playlist.tracks.total} tracks</p>
      </div>
    </div>
  );
}

export default PlaylistCard;
