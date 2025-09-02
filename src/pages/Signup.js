import React from "react";
import { Link } from "react-router-dom";
import "../styles/Auth.css";

function Signup() {
  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form className="auth-form">
        <input type="text" placeholder="Full Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Sign Up</button>
      </form>

      <p className="auth-switch">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default Signup;
