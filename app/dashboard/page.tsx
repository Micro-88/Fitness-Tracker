// app/dashboard/page.tsx

"use client"; // Add this directive to make the component a Client Component

import React, { useEffect, useState } from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useRouter } from 'next/navigation';

Chart.register(...registerables);

const Dashboard = () => {
  const router = useRouter();
  interface UserData {
    username: string;
    // Add other properties if needed
  }

  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login if no token is found
      router.push('/login');
      return;
    }

    // Fetch user data using the token
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/userData', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error('Failed to fetch user data');
          router.push('/login');
        }
      } catch (error) {
        console.error('An error occurred while fetching user data:', error);
        router.push('/login');
      }
    };

    fetchUserData();
  }, [router]);

  // Sample data for the doughnut chart
  const doughnutData = {
    labels: ['Workout A', 'Workout B', 'Workout C'],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  // Sample data for the line chart
  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Progress',
        fill: false,
        backgroundColor: '#36A2EB',
        borderColor: '#36A2EB',
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  };

  const lineOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Handler for the button click
  const handleGenerateWorkout = () => {
    alert("Workout generated!");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <h1>Dashboard</h1>
      {userData && <p>Welcome, {userData.username}</p>}
      {/* Left Box with Doughnut Chart */}
      <div className="md:w-1/3 p-4">
        <div className="bg-white shadow-md rounded-lg p-4 h-full">
          <h2 className="text-lg font-semibold mb-4">Workout Distribution</h2>
          <Doughnut data={doughnutData} />
        </div>
      </div>

      {/* Right Box divided into two sections */}
      <div className="md:w-2/3 flex flex-col">
        {/* Top Right Box */}
        <div className="flex-1 p-4">
          <div className="bg-white shadow-md rounded-lg p-4 h-full">
            <h2 className="text-lg font-semibold mb-4">Progress Graph</h2>
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>

        {/* Bottom Right Box */}
        <div className="flex-1 p-4">
          <div className="bg-white shadow-md rounded-lg p-4 h-full">
            <h2 className="text-lg font-semibold mb-4">Generate Workout</h2>
            <button onClick={handleGenerateWorkout} className="bg-blue-500 text-white px-4 py-2 rounded">
              Generate Workout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
