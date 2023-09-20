import React from "react";
import "./UserProfile.css"; 

function UserProfile({ userProfile }) {
  return (
    <div className="user-profile">
      <h2>Your Profile Information</h2>
      <p>Display Name: {userProfile.display_name}</p>
      <p>Email: {userProfile.email}</p>
      <p>Country: {userProfile.country}</p>
    </div>
  );
}

export default UserProfile;
