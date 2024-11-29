"use client";

import React, { useState } from 'react';

const SignUp: React.FC = () => {
  const [gender, setGender] = useState<string>(''); // State to manage the selected gender

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can add form submission logic here
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Background image for top section (full height on mobile, top half on large screens) */}
      <div className="w-full h-1/2 md:w-3/4 md:h-full bg-cover bg-center" style={{ backgroundImage: "url('/workout2.jpg')" }}></div>
      
      {/* Form Section on the bottom (full height on mobile, bottom quarter on large screens) */}
      <div className="w-full h-1/2 md:w-1/4 md:h-full flex justify-center items-center bg-[#1d1919] p-4">
        <div className="w-full max-w-[300px] text-left">
          <h1 className="text-4xl mb-8 text-white text-center">Sign Up</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label htmlFor="username" className="font-bold text-sm text-white">Username</label>
              <input type="text" id="username" name="username" required className="w-full p-2 border border-gray-300 rounded-md text-base text-black" />
            </div>
            <div>
              <label htmlFor="password" className="font-bold text-sm text-white">Password</label>
              <input type="password" id="password" name="password" required className="w-full p-2 border border-gray-300 rounded-md text-base text-black" />
            </div>

            {/* Gender Dropdown */}
            <div>
              <label htmlFor="gender" className="font-bold text-sm text-white">Gender</label>
              <select
                id="gender"
                name="gender"
                value={gender} // Use the value prop to control the selected gender
                onChange={(e) => setGender(e.target.value)} // Update the state when gender changes
                required
                className="w-full p-2 border border-gray-300 rounded-md text-base text-black"
              >
                <option value="" disabled>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {/* Age Input */}
            <div>
              <label htmlFor="age" className="font-bold text-sm text-white">Age</label>
              <input type="number" id="age" name="age" required className="w-full p-2 border border-gray-300 rounded-md text-base text-black" />
            </div>

            <button type="submit" className="w-full p-2 bg-[#333] text-white border-none rounded-full cursor-pointer text-sm">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
