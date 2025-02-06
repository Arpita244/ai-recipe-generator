import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <h1>Recipe Genie</h1>
      <p>Generate delicious recipes with AI.</p>
      <div className="home-buttons">
        <Link to="/login"><button>Login</button></Link>
        <Link to="/register"><button>Register</button></Link>
      </div>
    </div>
  );
};

export default Home;
