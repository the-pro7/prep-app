import React, { useState } from "react";
import "../../stylesheets/forgot-password/ForgotPassword.scss"
import { Link } from "react-router-dom";

// /forgot-password

export const ForgotPasswordPage = () => {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const [email, setEmail] = useState("");
  return (
    <main className="forgot-password-container">
        <Link to={-1} className="back-button">Back</Link>
      <h2>Forgot Password? No worries!</h2>
      <p>Enter your email below, let's get you some help</p>
      <form className="forgot-password-form">
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          placeholder="Enter your email address here..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Send OTP</button>
      </form>
    </main>
  );
};
