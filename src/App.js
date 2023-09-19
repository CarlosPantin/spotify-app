import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Header from "./components/Header";
import UserProfile from "./components/UserProfile";

function App() {
  const CLIENT_ID = "5d8095856a0449d0bf43848d1c99c77c";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const SCOPES = "user-read-private user-read-email";

  const [token, setToken] = useState("");
  const [userProfile, setUserProfile] = useState(null);

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
        setUserProfile(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  };

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
    setUserProfile(null);
  };

  const login = () => {
    // Redirect the user to the Spotify login page
    window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES}`;
  };

  return (
    <div className="App">
      <Header
        token={token}
        onLogout={logout}
        onLogin={login}
      />
      {token && userProfile && (
        <UserProfile userProfile={userProfile} />
      )}
    </div>
  );
}

export default App;
