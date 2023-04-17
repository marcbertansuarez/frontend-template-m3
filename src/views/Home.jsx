import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const { user } = useContext(AuthContext);
  return (
    <div className="home">
      {user ? <h1>Hello {user.username}</h1> : <h1>Welcome to ValoVision</h1>}

      <div className="home-links">
        <Link to={user ? "/lineup" : "/lineups"}>Discover LineUps</Link>
        <Link to="/tracker">Track Players</Link>
        <Link to="/agents">Discover Agents</Link>
        <Link to="/maps">Discover Maps</Link>
      </div>
    </div>
  );
}
