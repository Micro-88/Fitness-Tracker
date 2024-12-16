"use client";

import dynamic from 'next/dynamic';

// Dynamically load the Dashboard component
const FoodLog = dynamic(() => import('./FoodLogComponent'), { ssr: false });

export default function Page() {
  return <FoodLog />;
}