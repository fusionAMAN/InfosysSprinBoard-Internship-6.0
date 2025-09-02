import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Auth.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dummy check (replace with real API call later)
    if (email && password) {
      onLogin();               // mark authenticated
      navigate("/");           // go to dashboard
    } else {
      alert("Please enter email and password");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        New user? <Link to="/signup">Register here</Link>
      </p>
    </div>
  );
}

export default Login;
