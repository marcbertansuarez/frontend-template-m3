import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logook from '../images/logo ok.png';
import { MdClose } from 'react-icons/md';
import { FiMenu } from 'react-icons/fi';


export default function Navbar() {
  const { isLoggedIn, logOutUser, user } = useContext(AuthContext); 
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <div className="general-nav">
      <img style={{width: "60px"}} src={logook} alt="ValoVision" />
      <div className="navbar">
      <button className="toggle" onClick={() => setNavbarOpen((prev) => !prev)}>
          {navbarOpen ? (
        <MdClose style={{ width: '32px', height: '32px' }} color='white' />
      ) : (
        <FiMenu
          style={{
            width: '32px',
            height: '32px',
          }}
        color='white'/>
      )}
      </button>
      <ul className={`menu-nav${navbarOpen ? ' show-menu' : ''}`}>
      <li><NavLink to="/" onClick={() => setNavbarOpen(false)}>Home</NavLink></li>
        {!isLoggedIn && <li><NavLink to="/signup" onClick={() => setNavbarOpen(false)}>Sign up</NavLink></li>}
        {!isLoggedIn && <li><NavLink to="/login" onClick={() => setNavbarOpen(false)}>Login</NavLink></li>}
        <li><NavLink to={user ? "/lineup" : "/lineups"} onClick={() => setNavbarOpen(false)}>LineUps</NavLink></li>
        <li><NavLink to="/tracker" onClick={() => setNavbarOpen(false)}>Tracker Player</NavLink></li>
        <li><NavLink to="/agents" onClick={() => setNavbarOpen(false)}>Valorant Agents</NavLink></li>
        <li><NavLink to="/maps" onClick={() => setNavbarOpen(false)}>Valorant Maps</NavLink></li>
        {isLoggedIn && <li><NavLink to="/profile" onClick={() => setNavbarOpen(false)}>Profile</NavLink></li>}
        {/* {isLoggedIn && <li><NavLink to="/private">Private view</NavLink></li>} */}
        {isLoggedIn && <li><button onClick={() => {
          logOutUser() 
          setNavbarOpen(false)}}>Log out</button></li>}
        {/* <li><button onClick={() => navigate(-1)}>Go back</button></li> */}
      </ul>
      </div>
    </div>
  )
}
