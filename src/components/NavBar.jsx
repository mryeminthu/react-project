import React from 'react';
import { FaVideo, FaRegSun, FaMicrophone } from 'react-icons/fa';
import '../styles/navbar.css';

function NavBar() {
  const appName = "YMT's MovieMingle";
  return (
    <nav className="navbar">
      <div className="logo-container">
        <FaVideo className="logo" />
        <h1 className="appName">{appName}</h1>
      </div>
      <div className="icons">
        <FaMicrophone className="icons-left" />
        <FaRegSun className="icons-right" />
      </div>
    </nav>
  );
}

export default NavBar;
