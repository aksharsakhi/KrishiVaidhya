import React, { useState } from 'react';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [phoneNumber, setPhoneNumber] = useState<string>('+91');
  const [otp, setOtp] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
      backgroundSize: "cover",
      backgroundPosition: "center"
    }}>
      {/* Green overlay with farm landscape */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-500 to-transparent opacity-80"></div>
      
      {/* Yellow sun and mountains */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-yellow-400 rounded-b-full opacity-80"></div>
      <div className="absolute top-40 left-0 right-0 flex justify-center">
        <div className="w-32 h-32 bg-blue-200 rounded-full transform -translate-y-1/2 opacity-80"></div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black">WELCOME TO</h1>
          <h1 className="text-4xl font-bold text-black">KRISHI VAIDHYA</h1>
        </div>
        
        <div className="bg-white bg-opacity-80 p-8 rounded-lg w-full max-w-md mx-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="otp" className="block text-gray-700 mb-2">Otp</label>
              <input
                type="text"
                id="otp"
                placeholder="xxxx"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300"
            >
              Let's Start!
            </button>
          </form>
        </div>
        
        {/* Farm icon at bottom */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <div className="w-24 h-24 relative">
            <div className="absolute inset-0 border-4 border-dashed border-black rounded-full"></div>
            <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 flex items-center justify-center">
              <svg viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"></path>
                <path d="M8 9l4-4 4 4"></path>
                <path d="M16 15l-4 4-4-4"></path>
                <path d="M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0"></path>
              </svg>
            </div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                <path d="M12 6V2m0 4l-4 4m4-4l4 4"></path>
                <path d="M17 12h5"></path>
                <path d="M12 18v4"></path>
                <path d="M7 12H2"></path>
              </svg>
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;