import React, { useState } from 'react';
import "./ProfileHeader.css"
function ProfileHeader() {
  const [profilePicture, setProfilePicture] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  const handleBackgroundImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setBackgroundImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="profile-header">
      <div className="profile-upload-section">
        {profilePicture && <img src={profilePicture} alt="Profile" className="profile-picture" />}
        <input type="file" onChange={handleProfilePictureChange} />
      </div>

      <div className="background-upload-section">
        {backgroundImage && <img src={backgroundImage} alt="Background" className="background-image" />}
        <input type="file" onChange={handleBackgroundImageChange} />
      </div>
    </div>
  );
}

export default ProfileHeader;
