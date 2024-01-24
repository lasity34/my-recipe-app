import React, { useState, useEffect } from 'react';
import "./Profile.css";
// Import necessary hooks if you're using Redux, Context API, etc.

const Profile = () => {

  return (
 

    <div className="profile-container">
      <div className="profile-header">
        <img src="./path-to-your-image.png" alt="Profile" className="profile-picture" />
        <h1>{userData.username}</h1>
        <p>{userData.email}</p>
      </div>
      <div className="profile-content">
    </div>
    </div>
   
  );
};

export default Profile;
