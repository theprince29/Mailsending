import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [showEmailInputForReset, setShowEmailInputForReset] = useState(false);
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const [showResetPasswordForm, setShowResetPasswordForm] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed');

      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('https://mail-sending-backend.vercel.app/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to send OTP');

      setShowOTPVerification(true);
      setShowEmailInputForReset(false);
      setSuccessMessage('OTP sent to your email');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('https://mail-sending-backend.vercel.app/api/auth/verify-reset-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Invalid OTP');

      setShowOTPVerification(false);
      setShowResetPasswordForm(true);
      setSuccessMessage('OTP verified. Please enter your new password.');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://mail-sending-backend.vercel.app/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Reset failed');

      setSuccessMessage('Password reset successfully. You can now log in.');
      setShowResetPasswordForm(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-6 py-12 bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center">
          {showEmailInputForReset ? 'Forgot Password' :
           showOTPVerification ? 'Verify OTP' :
           showResetPasswordForm ? 'Reset Password' :
           'Sign in to your account'}
        </h2>

        {error && <p className="text-red-600 text-sm">{error}</p>}
        {successMessage && <p className="text-green-600 text-sm">{successMessage}</p>}

        {/* Login Form */}
        {!showEmailInputForReset && !showOTPVerification && !showResetPasswordForm && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
            <div className="text-right text-sm">
              <button
                type="button"
                className="text-indigo-600 hover:underline"
                onClick={() => {
                  setShowEmailInputForReset(true);
                  setError('');
                  setSuccessMessage('');
                }}
              >
                Forgot password?
              </button>
            </div>
          </form>
        )}

        {/* Email Input for OTP */}
        {showEmailInputForReset && (
          <form onSubmit={handleSendOTP} className="space-y-4">
            <div>
              <label className="block text-sm">Enter your email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        )}

        {/* OTP Verification */}
        {showOTPVerification && (
          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <div>
              <label className="block text-sm">Enter OTP</label>
              <input
                type="text"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>
        )}

        {/* Reset Password */}
        {showResetPasswordForm && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label className="block text-sm">New Password</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm">Confirm Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        )}

        {/* Register redirect */}
        {!showOTPVerification && !showResetPasswordForm && !showEmailInputForReset && (
          <div className="text-sm text-center text-gray-600">
            Don’t have an account?{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-indigo-600 hover:underline"
            >
              Register
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
