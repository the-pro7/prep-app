import React, { useState } from "react";

// /confirm-otp

const ReceiveOtp = () => {
  // Grab BASE_URL from .env  file
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <main className="otp-container">
      <h2>Enter the OTP sent to your e-mail to continue</h2>
      <p>We sent an otp to user.email, enter it here to set new password</p>
      <form className="otp-form">
        <input
          type="text"
          name="otp"
          id="otp"
          value={otp}
          placeholder="Enter OTP here.."
          onChange={(e) => setOtp(e.target.value)}
        />
        <button disabled={loading}>Verify</button>
      </form>
    </main>
  );
};

export default ReceiveOtp;
