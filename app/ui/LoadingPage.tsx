import React from 'react';
import Image from 'next/image'; // Import the Image component from next/image
import './LoadingPage.css'; // Import the CSS file for animation

const LoadingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Image src="/images/loading.gif" alt="Loading..." width={96} height={96} className="w-24 h-24 mb-4" />
      <div className="text-white text-lg font-semibold">
        Loading<span className="dot1">.</span><span className="dot2">.</span><span className="dot3">.</span>
      </div>
    </div>
  );
};

export default LoadingPage;