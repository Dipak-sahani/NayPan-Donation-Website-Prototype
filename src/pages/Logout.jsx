import React from 'react';
import { useNavigate } from 'react-router-dom';
import { account } from '../appwrite/appwrite.js';

function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
      navigate('/login');
    } catch (err) {
      console.error('Error logging out:', err.message);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;
