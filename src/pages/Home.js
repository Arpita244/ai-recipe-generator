import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <h1>Recipe Genie</h1>
      <p>Generate delicious recipes with the power <br></br>
       of AI. Whether you're craving a quick snack<br></br>
        or a gourmet meal, Recipe Genie will guide<br></br> 
        you through the process with personalized,<br></br> 
        easy-to-follow recipes.</p>
      <div className="home-buttons">
        <Link to="/login"><button>Login</button></Link>
        <Link to="/register"><button>Register</button></Link>
      </div>
    </div>
  );
};

export default Home;
