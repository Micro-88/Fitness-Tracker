"use client";

import React, { useEffect } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { GetUserProfileInToken } from './../../helpers/profile.helper';

const UserProfile: React.FC = () => {

  const userProfile = GetUserProfileInToken();
  
  console.log(userProfile);

  return (
    <div className="flex flex-col md:flex-row h-auto md:h-screen bg-[#1d1919] text-white">
      {/* Profile image section */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-[#333] p-8 gap-4">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white">
          <UserCircleIcon className="w-full h-full object-cover" />
        </div>
        <h2 className="text-xl font-bold">{userProfile?.username}</h2>
      </div>

      {/* Right details section */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-8">
        <div className="w-full max-w-md bg-[#252525] p-8 rounded-lg text-left shadow-lg">
          <h1 className="text-2xl mb-6">Profile Details</h1>
          <div className="flex justify-between mb-4">
            <span className="font-bold text-lg">Username:</span>
            <span className="text-lg text-gray-400">{userProfile?.username}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="font-bold text-lg">Age:</span>
            <span className="text-lg text-gray-400">{userProfile?.age}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="font-bold text-lg">Gender:</span>
            <span className="text-lg text-gray-400">{userProfile?.gender}</span>
          </div>
          {/* <button className="w-full py-2 bg-[#333] text-white rounded-full text-sm lowercase mt-4 hover:bg-[#555] transform hover:scale-105 transition duration-300">
            Edit Profile
          </button> */}
          {/* Delete Profile Button */}
          <button className="w-full py-2 bg-red-600 text-white rounded-full text-sm lowercase mt-4 hover:bg-red-700 transform hover:scale-105 transition duration-300">
            Delete Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
