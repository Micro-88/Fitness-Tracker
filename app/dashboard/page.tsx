// app/dashboard/page.tsx

import React from "react";

export default function Dashboard() {
  return (
    <div className="flex h-screen p-4 bg-gray-100">
      {/* Left Side */}
      <div className="w-1/2 flex items-center justify-center p-4">
        <div className="w-full h-full bg-white shadow-lg rounded-md flex items-center justify-center">
          {/* Left box content here */}
          <p className="text-gray-700">Left Side Content</p>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-1/2 flex flex-col space-y-4">
        {/* Top Right */}
        <div className="h-1/2 bg-white shadow-lg rounded-md flex items-center justify-center">
          <p className="text-gray-700">Top Right Content</p>
        </div>

        {/* Bottom Right */}
        <div className="h-1/2 bg-white shadow-lg rounded-md flex items-center justify-center">
          <p className="text-gray-700">Bottom Right Content</p>
        </div>
      </div>
    </div>
  );
}
