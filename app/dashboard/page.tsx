"use client";

import dynamic from 'next/dynamic';

// Dynamically load the Dashboard component
const Dashboard = dynamic(() => import('./DashboardComponent'), { ssr: false });

export default function Page() {
  return <Dashboard />;
}
