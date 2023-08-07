import React, { useEffect, useState } from 'react';
import './profile.css'
const Profile = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    // Simulating data fetching from a database
    const fetchData = async () => {
      try {
        // Make an API request to fetch the profile data
        const response = await fetch('http://localhost:8100/profile/abem');
        const data = await response.json();
        setProfileData(data[0]);
        // console.log(data[0]);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchData();
  }, []);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile">
      <div className="profile-header">  
        <img src={`http://localhost:8100/${profileData.image_url}`} alt="Profile Picture" className="profile-picture" />
      </div>
      <div className="profile-info">
        <h2>{profileData.f_name} {profileData.m_name} {profileData.l_name}</h2>
        <p>Username: {profileData.username}</p>
        <p>Role: {profileData.role}</p>
        <p>Phone: {profileData.phone}</p>
        <button className='btn btn-warning'>Change Password</button>
      </div>
    </div>
  );
};

export default Profile;