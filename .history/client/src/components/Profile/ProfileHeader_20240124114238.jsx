import React, { useRef, useState } from 'react';
import "./ProfileHeader.css"; // Make sure your CSS is updated accordingly

function ProfileHeader() {
  const [profilePicture, setProfilePicture] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const profileInputRef = useRef(null);
  const backgroundInputRef = useRef(null);

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
    <div className="profile-header" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <input type="file" onChange={handleBackgroundImageChange} ref={backgroundInputRef} style={{ display: 'none' }} />
      <button className="upload-background-button" onClick={() => backgroundInputRef.current.click()}>Upload Background</button>

      <div className="profile-picture-overlay" onClick={() => profileInputRef.current.click()}>
        {profilePicture ? (
          <img src={profilePicture} alt="Profile" className="profile-picture" />
        ) : (
          <div className="profile-picture-default"></div> // Style this as needed
        )}
        <input type="file" onChange={handleProfilePictureChange} ref={profileInputRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
}

export default ProfileHeader;
