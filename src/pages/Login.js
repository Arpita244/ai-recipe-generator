import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const [input, setInput] = useState(""); // Accepts username or email
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && (storedUser.email === input || storedUser.username === input) && storedUser.password === password) {
      setUser(storedUser.username);
      localStorage.setItem("loggedInUser", storedUser.username);
      navigate("/dashboard");
    } else {
      alert("Invalid credentials! Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Email or Username" value={input} onChange={(e) => setInput(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <span onClick={() => navigate("/register")} className="link">Register here</span>
      </p>
    </div>
  );
};

export default Login;
