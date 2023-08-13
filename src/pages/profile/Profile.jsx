import React, { useEffect, useState } from 'react';
import './profile.css'
import Add from "./Add";
import { useStateValue } from "../../utility/stateprovider";
import { imageserver, server } from '../../constants';

const columns = [
    {
    field: 'curent_password',
    headerName: 'curent_password',
    type: 'password',
    required: true
  },
  {
    field: 'password',
    headerName: 'New_password',
    type: 'password',
    required: true
  },
  {
    field: 'c_password',
    headerName: 'confirm password',
    type: 'password',
    required: true
  },
      

];
const columns2 = [
  {
    field: 'f_name',
    headerName: 'First Name',
    type: 'text',
    required: true
  },
  {
    field: 'm_name',
    headerName: 'Middle Name',
    type: 'text',
    required: true
  },
  {
    field: 'l_name',
    headerName: 'Last Name',
    type: 'text',
    required: true
  },
  {
    field: 'phone',
    headerName: 'Phone Number',
    type: 'number',
    required: true
  },
    {
    field: 'profile',
    headerName: 'Image',
    type: 'image',
    required: true
  }

];


const Profile = () => {
   const [{ user ,role}, dispatch] = useStateValue();
  const [profileData, setProfileData] = useState(null);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const handleChangeUpdateProfileClick = () => { 
  setOpen2(true);
  }

  const handleChangePasswordClick = () => {
    
    setOpen(true);
  };

  const handleCloseAddUser = () => {
    console.log("not object");
    setOpen(false);
  };
  useEffect(() => {
    // Simulating data fetching from a database
    const fetchData = async () => {
      try {
        // Make an API request to fetch the profile data
        const response = await fetch(`${server}profile/${user}`);
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
        <button className='btn btn-warning' onClick={handleChangePasswordClick}>Change Password</button>
        {/* <button className='btn btn-primary' onClick={handleChangeUpdateProfileClick}>Update Profile</button> */}
        {open &&<Add name= 'change_password' columns={columns} setOpen={setOpen} />} 
       {open2 &&<Add name= 'updateProfile' columns={columns2} setOpen={setOpen2} />}
      </div>
    </div>
  );
};

export default Profile;