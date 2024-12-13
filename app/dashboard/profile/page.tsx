"use client";

import dynamic from 'next/dynamic';

// Dynamically load the Dashboard component
const Profile = dynamic(() => import('./ProfileComponent'), { ssr: false });

export default function Page() {
  return <Profile />;
}