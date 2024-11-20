import React, { useEffect, createContext, useState } from 'react';
import {jwtDecode} from 'jwt-decode';

export const UserAuthContext = createContext();

export const UserAuthProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [profilePic , setProfilePic]= useState('');

  useEffect(() => {
    const token = localStorage.getItem('Blogtoken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const { userId, username , profilePic } = decodedToken;
        console.log(userId+username)
        setUsername(username);
        setUserId(userId);
        setProfilePic( profilePic);
      } catch (error) {
        console.error('Invalid token:', error);
        //localStorage.removeItem('Blogtoken');
      }
    }
  }, []);

  return (
    <UserAuthContext.Provider value={{ username, setUsername, userId, setUserId , profilePic , setProfilePic }}> 
      {children}
    </UserAuthContext.Provider>
  );
};