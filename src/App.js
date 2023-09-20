import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Header from "./components/Header";
import UserProfile from "./components/UserProfile";
import PlaylistList from "./components/Playlist";
import TopArtists from "./components/TopArtists";
import TopTracks from "./components/TopTracks";

function App() {
  const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const SCOPES = "user-read-private user-read-email playlist-read-private user-top-read";

  const [token, setToken] = useState("");
  const [userProfile, setUserProfile] = useState(null);
  const [showPlaylists, setShowPlaylists] = useState(false);
  const [showTopArtists, setShowTopArtists] = useState(false);
  const [showTopTracks, setShowTopTracks] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    setToken(token);

    if (token) {
      fetchUserProfile(token);
    }
  }, []);

  const fetchUserProfile = (accessToken) => {
    axios
      .get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const userProfile = response.data;
        setUserProfile(userProfile);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  };

  const clearToken = () => {
    window.localStorage.removeItem("token");
    setToken("");
  };

  const login = () => {
    clearToken();
    window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES}`;
  };

  const showPlaylistPage = () => {
    setShowPlaylists(true);
    setShowTopArtists(false); 
    setShowTopTracks(false); 
  };

  const showTopArtistsPage = () => {
    setShowTopArtists(true);
    setShowPlaylists(false); 
    setShowTopTracks(false); 
  };

  const showTopTracksPage = () => {
    setShowTopTracks(true);
    setShowPlaylists(false); 
    setShowTopArtists(false); 
  };

  const backToProfile = () => {
    setShowPlaylists(false);
    setShowTopArtists(false);
    setShowTopTracks(false);
  };

  const logout = () => {
    clearToken();
    setUserProfile(null);
    setShowPlaylists(false);
    setShowTopArtists(false);
    setShowTopTracks(false);
  };

  const showProfile = !showTopArtists && !showTopTracks;

  return (
    <div className="App">
      <Header
        token={token}
        onLogout={logout}
        onLogin={login}
        onShowPlaylists={showPlaylistPage}
        onBackToProfile={backToProfile}
        onShowTopArtists={showTopArtistsPage}
        onShowTopTracks={showTopTracksPage}
      />
      {showProfile && token && userProfile && !showPlaylists && (
        <UserProfile userProfile={userProfile} />
      )}
      {showPlaylists && (
        <PlaylistList token={token} onBackToProfile={backToProfile} />
      )}
      {showTopArtists && <TopArtists token={token} />}
      {showTopTracks && <TopTracks token={token} />}
    </div>
  );
}

export default App;
