import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Check if the user is registered
    const registeredUser = localStorage.getItem("user");
    const registeredPassword = localStorage.getItem("password");

    if (!registeredUser) {
      alert("No account found! Please register first.");
      navigate("/register");
      return;
    }

    // Check if entered credentials match stored credentials
    if (email === registeredUser && password === registeredPassword) {
      localStorage.setItem("user", email);
      setUser(email);
      navigate("/dashboard");
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
