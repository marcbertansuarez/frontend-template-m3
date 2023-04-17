import React, { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import logook from "../images/logo ok.png";
import { MdClose } from "react-icons/md";
import { FiMenu } from "react-icons/fi";

export default function Navbar() {
  const { isLoggedIn, logOutUser, user } = useContext(AuthContext);
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <nav className="general-nav">
      <Link className="logo" to="/">
        <img src={logook} alt="ValoVision" />
      </Link>

      <button
        className="hamburger"
        onClick={() => setNavbarOpen((prev) => !prev)}
      >
        {navbarOpen ? (
          <MdClose style={{ width: "32px", height: "32px" }} color="white" />
        ) : (
          <FiMenu
            style={{
              width: "32px",
              height: "32px",
            }}
            color="white"
          />
        )}
      </button>
      <div>
        <ul className={`navigation-menu${navbarOpen ? " show-menu" : ""}`}>
          <li>
            <NavLink to="/" onClick={() => setNavbarOpen(false)}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={user ? "/lineup" : "/lineups"}
              onClick={() => setNavbarOpen(false)}
            >
              LineUps
            </NavLink>
          </li>
          <li>
            <NavLink to="/ranking" onClick={() => setNavbarOpen(false)}>
              Ranking
            </NavLink>
          </li>
          <li>
            <NavLink to="/tracker" onClick={() => setNavbarOpen(false)}>
              Tracker Player
            </NavLink>
          </li>
          <li>
            <NavLink to="/agents" onClick={() => setNavbarOpen(false)}>
              Valorant Agents
            </NavLink>
          </li>
          <li>
            <NavLink to="/maps" onClick={() => setNavbarOpen(false)}>
              Valorant Maps
            </NavLink>
          </li>
          {isLoggedIn && (
            <li>
              <NavLink to="/profile" onClick={() => setNavbarOpen(false)}>
                Profile
              </NavLink>
            </li>
          )}
          {!isLoggedIn && (
            <li>
              <NavLink to="/login" onClick={() => setNavbarOpen(false)}>
                Login
              </NavLink>
            </li>
          )}
          {!isLoggedIn && (
            <li>
              <NavLink to="/signup" onClick={() => setNavbarOpen(false)}>
                Sign up
              </NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button
                className="logout"
                onClick={() => {
                  logOutUser();
                  setNavbarOpen(false);
                }}
              >
                Log out
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
