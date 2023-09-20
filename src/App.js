import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Header from "./components/Header";
import UserProfile from "./components/UserProfile";
import PlaylistList from "./components/Playlist"; 

function App() {
  const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const SCOPES = "user-read-private user-read-email playlist-read-private";

  const [token, setToken] = useState("");
  
  const [userProfile, setUserProfile] = useState(null);
  const [showPlaylists, setShowPlaylists] = useState(false);

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

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
    setUserProfile(null);
    setShowPlaylists(false);
  };

  const login = () => {
    window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES}`;
  };

  const showPlaylistPage = () => {
    setShowPlaylists(true);
  };

  const backToProfile = () => {
    console.log("Back to Profile button clicked");
    setShowPlaylists(false);
  };

  return (
    <div className="App">
      <Header
        token={token}
        onLogout={logout}
        onLogin={login}
        onShowPlaylists={showPlaylistPage}
        onBackToProfile={backToProfile}
      />
      {token && userProfile && !showPlaylists && (
        <UserProfile userProfile={userProfile} />
      )}
      {showPlaylists && (
        <PlaylistList token={token} onBackToProfile={backToProfile} />
      )}
    </div>
  );
}

export default App;
