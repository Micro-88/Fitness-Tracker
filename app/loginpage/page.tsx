"use client";

import React, { useState } from 'react';

const Login: React.FC = () => {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add login logic here
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Background image for top section (full height on mobile, top half on large screens) */}
      <div className="w-full h-1/2 md:w-3/4 md:h-full bg-cover bg-center" style={{ backgroundImage: "url('/workout2.jpg')" }}></div>
      
      {/* Form Section on the bottom (full height on mobile, bottom quarter on large screens) */}
      <div className="w-full h-1/2 md:w-1/4 md:h-full flex justify-center items-center bg-[#1d1919] p-4">
        <div className="w-full max-w-[300px] text-left">
          <h1 className="text-4xl mb-8 text-white text-center">Login</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label htmlFor="username" className="font-bold text-sm text-white">Username</label>
              <input type="text" id="username" name="username" required className="w-full p-2 border border-gray-300 rounded-md text-base text-black" />
            </div>
            <div>
              <label htmlFor="password" className="font-bold text-sm text-white">Password</label>
              <input type="password" id="password" name="password" required className="w-full p-2 border border-gray-300 rounded-md text-base text-black" />
            </div>

            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="rememberMe" 
                checked={rememberMe} 
                onChange={() => setRememberMe(!rememberMe)} 
                className="rounded-md" 
              />
              <label htmlFor="rememberMe" className="text-white text-sm">Remember Me</label>
            </div>

            <button type="submit" className="w-full p-2 bg-[#333] text-white border-none rounded-full cursor-pointer text-sm">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
