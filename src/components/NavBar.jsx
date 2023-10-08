import React from 'react';
import { FaUserFriends, FaRegSun } from 'react-icons/fa';
import { GrMicrophone } from 'react-icons/gr';
import '../styles/navbar.css';

function NavBar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <FaUserFriends />
        <h1>People</h1>
      </div>
      <div className="icons">
        <GrMicrophone />
        <FaRegSun />
      </div>
    </nav>
  );
}

export default NavBar;
