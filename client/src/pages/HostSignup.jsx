import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HostSignup = () => {
  let apiUrl;
  const host = window.location.hostname;
  if (host === 'localhost') {
    apiUrl = 'http://localhost:3000';
  } else {
    apiUrl = 'https://student-nest-vivek.onrender.com';
  }

  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Step 1: Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {

      const res = await fetch(apiUrl + "/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email })
      });

      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setOtpSent(true);
      setError(null);
      alert("OTP sent to your email!");
      setLoading(false);
    } catch (err) {
      setError("Failed to send OTP");
      setLoading(false);
    }
  };

  // Step 2: Verify OTP & Complete Signup
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(apiUrl + "/api/auth/signup-host", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, otp })
      });

      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setError(null);
      setLoading(false);
      alert("Now you can login to you host account");
      navigate("/signin");
    } catch (err) {
      setError("OTP verification failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-blue-100 to-white">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQS8469CWcG0jmfblNS5dE29NNXplReMpVDw&s)",
        }}
      ></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
            Become a Hosting Partner
          </h2>

          {!otpSent ? (
            // Step 1: Signup Form
            <form onSubmit={handleSendOtp}>
              <div className="mb-4">
                <input
                  onChange={handleChange}
                  type="text"
                  id="firstName"
                  placeholder="First Name"
                  className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <input
                  onChange={handleChange}
                  type="text"
                  id="lastName"
                  placeholder="Last Name"
                  className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <input
                  onChange={handleChange}
                  type="email"
                  id="email"
                  placeholder="Email"
                  className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <input
                  onChange={handleChange}
                  type="text"
                  id="contact"
                  placeholder="Contact Number"
                  className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-6">
                <input
                  onChange={handleChange}
                  type="password"
                  id="password"
                  placeholder="Password"
                  className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                disabled={loading}
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition duration-300"
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </form>
          ) : (
            // Step 2: OTP Verification
            <form onSubmit={handleVerifyOtp}>
              <div className="mb-4">
                <input
                  onChange={(e) => setOtp(e.target.value)}
                  type="text"
                  placeholder="Enter OTP"
                  className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                disabled={loading}
                type="submit"
                className="w-full bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600 transition duration-300"
              >
                {loading ? "Verifying..." : "Verify OTP & Signup"}
              </button>
            </form>
          )}

          {error && <p className="text-red-500 mt-5">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default HostSignup;
