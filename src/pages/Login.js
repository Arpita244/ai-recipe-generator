import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css"; // Ensure this file has the latest styles

const Login = ({ setUser }) => {
  const [input, setInput] = useState(""); // Accepts username or email
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      setError("No user found! Please register.");
      return;
    }

    if (
      (storedUser.email === input || storedUser.username === input) &&
      storedUser.password === password
    ) {
      setUser(storedUser.username);
      localStorage.setItem("loggedInUser", storedUser.username);
      navigate("/dashboard");
    } else {
      setError("Invalid credentials! Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email or Username"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
          />

          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁️" : "🔒"}
            </button>
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
        <p>
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")} className="link">
            Register here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
