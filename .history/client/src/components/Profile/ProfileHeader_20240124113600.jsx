import React, { useRef, useState } from 'react';
import "./ProfileHeader.css"; // Ensure your CSS handles the layout and styling as described

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
    <div className="profile-header">
      <div className="profile-picture-container" onClick={() => profileInputRef.current.click()}>
        {profilePicture ? (
          <img src={profilePicture} alt="Profile" className="profile-picture" />
        ) : (
          <div className="profile-picture-default"> {/* Style this to look like a default profile picture background */}</div>
        )}
        <input type="file" onChange={handleProfilePictureChange} ref={profileInputRef} style={{ display: 'none' }} />
      </div>

      <div className="background-upload-section">
        {backgroundImage ? (
          <img src={backgroundImage} alt="Background" className="background-image" />
        ) : (
          <div className="background-default"> {/* Style this to cover the rest of the header as a default background */}</div>
        )}
        <button onClick={() => backgroundInputRef.current.click()}>Upload</button>
        <input type="file" onChange={handleBackgroundImageChange} ref={backgroundInputRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
}

export default ProfileHeader;
