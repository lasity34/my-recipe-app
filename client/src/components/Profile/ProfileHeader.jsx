import React, { useRef, useState, useEffect } from 'react';
import "./ProfileHeader.css";
import { useAuth } from '../../context/AuthContext';
import { uploadImage, fetchImage } from '../../api/Cocktail'; // Make sure to implement fetchImage in your API file

function ProfileHeader() {
  const { user } = useAuth();
  const [profilePicture, setProfilePicture] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const profileInputRef = useRef(null);
  const backgroundInputRef = useRef(null);

  const handleProfilePictureChange = async (event) => {
    const file = event.target.files[0];
   
    if (file) { // Removed user check for simplicity, add back if needed for other reasons
      try {
        const imageUrl = await uploadImage(file, 'profile'); // Removed 'user.userId' and 'profile'
        setProfilePicture(imageUrl); // Adjust based on actual API response
      } catch (error) {
        console.error('Error uploading profile picture:', error);
      }
    }
  };

  const handleBackgroundImageChange = async (event) => {
    const file = event.target.files[0];

    if (file) 
      try {
        const imageUrl = await uploadImage(file, 'background');
        setBackgroundImage(imageUrl); 
      } catch (error) {
        console.error('Error uploading background image:', error);
      }
    
  };

  

  // Load initial profile and background images
  useEffect(() => {
    if (user && user.userId) {
      // Fetch images only if userId is available
      fetchImage(user.userId, 'profile-image').then(setProfilePicture).catch(console.error);
      fetchImage(user.userId, 'background-image').then(setBackgroundImage).catch(console.error);
    }
  }, [user]); // Dependency array includes 'user' to re-run the effect when the user state changes
  
  
  return (
    <div className="profile-header" style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}>
      <a href="/" className="home-link">Home</a>
      <input type="file" onChange={handleBackgroundImageChange} ref={backgroundInputRef} style={{ display: 'none' }} />
      <button className="upload-background-button" onClick={() => backgroundInputRef.current.click()}>Edit Cover Photo</button>

      <div className="profile-picture-container" onClick={() => profileInputRef.current.click()}>
        {profilePicture ? (
          <img src={profilePicture} alt="Profile" className="profile-picture" />
        ) : (
          <div className="profile-picture-default"></div>
        )}
        <input type="file" onChange={handleProfilePictureChange} ref={profileInputRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
}

export default ProfileHeader;
