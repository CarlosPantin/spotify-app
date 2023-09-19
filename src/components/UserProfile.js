// UserProfile.js
import React from "react";

function UserProfile({ userProfile }) {
  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <p>Display Name: {userProfile.display_name}</p>
      <p>Email: {userProfile.email}</p>
      {/* Add more profile information as needed */}
    </div>
  );
}

export default UserProfile;