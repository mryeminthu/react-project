import React from 'react';
import { FaVideo, FaRegSun, FaMicrophone } from 'react-icons/fa';
import '../styles/navbar.css';

function NavBar() {
  const appName = "YMT's MovieMingle";
  return (
    <nav className="navbar">
      <div className="logo">
        <FaVideo />
        <h1>{appName}</h1>
      </div>
      <div className="icons">
        <FaMicrophone />
        <FaRegSun />
      </div>
    </nav>
  );
}

export default NavBar;
