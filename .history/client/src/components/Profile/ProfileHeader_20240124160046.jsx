import React, { useRef, useState } from 'react';
import "./ProfileHeader.css"; // Make sure your CSS is updated accordingly
import { useAuth } from '../../context/AuthContext';
import { uploadImage } from '../../api/Cocktail';

function ProfileHeader() {
  const { user } = useAuth();
  const [profilePicture, setProfilePicture] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const profileInputRef = useRef(null);
  const backgroundInputRef = useRef(null);

  const handleProfilePictureChange = async (event) => {
    const file = event.target.files[0];
    if (file && user) { // Check for file and user existence
      try {
        const imageUrl = await uploadImage(file, user.userId, 'profile'); // Use user.userId
        setProfilePicture(imageUrl);
      } catch (error) {
        console.error('Error uploading profile picture:', error);
      }
    }
  };

  const handleBackgroundImageChange = async (event) => {
    const file = event.target.files[0];
    if (file && user) { // Check for file and user existence
      try {
        const imageUrl = await uploadImage(file, user.userId, 'background'); // Use user.userId
        setBackgroundImage(imageUrl);
      } catch (error) {
        console.error('Error uploading background image:', error);
      }
    }
  };

  return (
    <div className="profile-header" style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}>
            <a href="/" className="home-link">Home</a>
      <input type="file" onChange={handleBackgroundImageChange} ref={backgroundInputRef} style={{ display: 'none' }} />
      <button className="upload-background-button" onClick={() => backgroundInputRef.current.click()}>Edit Cover Photo</button>
  
      <div className="profile-picture-container" onClick={() => profileInputRef.current.click()}>
        {profilePicture ? (
          <img src={profilePicture} alt="Profile" className="profile-picture" />
        ) : (
          <div className="profile-picture-default"></div> // Ensure this div has visible styles
        )}
        <input type="file" onChange={handleProfilePictureChange} ref={profileInputRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
  
}

export default ProfileHeader;
