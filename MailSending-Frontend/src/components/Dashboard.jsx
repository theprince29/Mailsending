import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const [fromEmail, setFromEmail] = useState('');
  const [recipients, setRecipients] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [showUpgradePopup, setShowUpgradePopup] = useState(false);
  const [isUpgraded, setIsUpgraded] = useState(false);

 useEffect(() => {
  const storedUser = localStorage.getItem('user');
  if (!storedUser) {
    navigate('/login');
    return;
  }

  const parsedUser = JSON.parse(storedUser);
  const userId = parsedUser.id;

  const fetchUserStatus = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/user/${userId}`);
      const data = await res.json();
      if (res.ok) {
        setIsUpgraded(data.isUpgrade);
        // Optional: update localStorage
        localStorage.setItem('user', JSON.stringify({ ...parsedUser, upgrade: data.isUpgrade }));
      }
    } catch (err) {
      console.error('Error fetching user:', err);
    }
  };

  fetchUserStatus(); // initial call
  const interval = setInterval(fetchUserStatus, 10000);

  return () => clearInterval(interval);
}, [navigate]);


  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleSend = async (e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        toast.error("User not found, please login again.");
        return;
      }

      const recipientArray = recipients
        .split(/\s+/)
        .map(email => email.trim())
        .filter(email => email.length > 0);

      if (recipientArray.length === 0) {
        toast.error("Please enter at least one recipient email.");
        return;
      }

      const response = await fetch('https://mail-sending-backend.vercel.app/api/mail/send', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fromEmail,
          amount: subject,
          recipients: recipientArray,
          message,
          userId: user.id
        }),
      });

      const result = await response.json();
      console.log('Response:', result);

      if (response.ok && result.success) {
        setFromEmail('');
        setRecipients('');
        setMessage('');
        setSubject('');
        toast.success("Mail sent successfully");
      } else {
        toast.error(result.error || "Failed to send mail");
      }

    } catch (error) {
      console.error("Error sending mail:", error);
      toast.error("Something went wrong while sending the mail");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 relative">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md relative">

        {/* Enhanced Header Section */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
          {/* Logo/App Name */}
          <div className="flex items-center">
           
            <h1 className="text-xl font-bold text-gray-800">Blastinvo</h1>
          </div>

          {/* Plan Display - Enhanced */}
          <div className="flex items-center space-x-3">
            {isUpgraded ? (
              <div className="flex items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Pro Plan</span>
              </div>
            ) : (
              <>
                <div className="flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                  </svg>
                  <span>Free Plan</span>
                </div>
                <button
                  onClick={() => setShowUpgradePopup(true)}
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:shadow-md transition-all duration-200"
                >
                  Upgrade
                </button>
              </>
            )}
            <button
              onClick={handleLogout}
              className="text-gray-500 hover:text-red-500 transition-colors duration-200"
              title="Logout"
            >
            <img src="/images/logout.png" alt="" className='h-8 w-10 cursor-pointer' />
            </button>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Send Email</h2>

        <input
          type="email"
          placeholder="Your Email"
          value={fromEmail}
          onChange={(e) => setFromEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="text"
          placeholder="Enter Price"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <textarea
          placeholder="Enter recipient emails separated by spaces or new lines"
          value={recipients}
          onChange={(e) => setRecipients(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-xl h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <textarea
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-xl h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleSend}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-xl transition-colors font-medium shadow-md hover:shadow-lg"
        >
          Send
        </button>
      </div>

      {showUpgradePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Upgrade Your Plan</h3>
              <button
                onClick={() => setShowUpgradePopup(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                To upgrade your account and unlock premium features, please contact our admin:
              </p>
              <a
                href="https://t.me/unchased"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full bg-blue-50 text-blue-600 px-4 py-3 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
                </svg>
                Contact @unchased on Telegram
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;