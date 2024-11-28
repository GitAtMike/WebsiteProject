import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function HomeButton() {
  const navigate = useNavigate();
  const location = useLocation();

  // Do not display the Home Button on the Home Page
  if (location.pathname === '/home') return null;

  return (
    <button
      onClick={() => navigate('/home')}
      className="home-button"
    >
      Home
    </button>
  );
}

export default HomeButton;
