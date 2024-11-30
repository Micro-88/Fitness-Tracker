"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";


Chart.register(...registerables);

const Dashboard: React.FC = () => {
  const [workoutGenerated, setWorkoutGenerated] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    
    if (!token) {
      router.push('/loginpage');
      return;
    }

    // Token verification is now handled by middleware/authMiddleware.ts
  }, [router]);

  if (!isClient) {
    return null;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleSignOut = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    router.push('/loginpage');
  };

  // Sample data for the line chart
  const lineData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Progress",
        fill: false,
        backgroundColor: "#36A2EB",
        borderColor: "#36A2EB",
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

  const handleGenerateWorkout = () => {
    // Set workout as generated
    setWorkoutGenerated(true);
    // Redirect to workout planner page
    router.push('/workout_planner');
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Box with Analytics Chart */}
      <div className="md:w-1/2 p-4">
        <div className="bg-white shadow-md rounded-lg p-4 h-full">
          <h2 className="text-lg font-semibold mb-4">Progress Graph</h2>
          <Line data={lineData} options={lineOptions} />
        </div>
      </div>

      {/* Right Box with Workout Plan */}
      <div className="md:w-1/2 p-4">
        <div className="bg-white shadow-md rounded-lg p-4 h-full">
          {!workoutGenerated ? (
            // Generate Workout UI
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-lg font-semibold mb-4">Generate Workout</h2>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                onClick={handleGenerateWorkout}
              >
                Generate Workout
              </button>
            </div>
          ) : (
            // To-Do List UI
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg text-black font-semibold">To-Do List</h2>
                <div className="flex space-x-4">
                  <button
                    className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
                    onClick={() => setWorkoutGenerated(false)}
                  >
                    Edit Workout
                  </button>
                  <button
                    className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
                    onClick={handleGenerateWorkout}
                  >
                    Generate New Plan
                  </button>
                </div>
              </div>
              {/* Divider bar */}
              <div className="border-t-2 border-gray-300 mb-4"></div>
              
              {/* Workout Details List */}
              <ul className="space-y-4">
                <li className="bg-gray-100 p-4 rounded-lg shadow-md relative">
                  {/* Checkbox at the top right of the card */}
                  <input
                    type="checkbox"
                    id="task1"
                    className="absolute top-2 right-2 w-4 h-4"
                  />
                  <div className="text-sm font-semibold text-gray-600">Name: <span className="font-normal">WorkoutName</span></div>
                  <div className="text-sm font-semibold text-gray-600">Equipment: <span className="font-normal">Dumbbells</span></div>
                  <div className="text-sm font-semibold text-gray-600">Duration: <span className="font-normal">45 minutes</span></div>
                  <div className="text-sm font-semibold text-gray-600">Description: <span className="font-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span></div>
                  <div className="text-sm font-semibold text-gray-600">Instructions: <span className="font-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti.</span></div>
                </li>
                {/* Repeat the above structure for each workout */}
                <li className="bg-gray-100 p-4 rounded-lg shadow-md relative">
                  {/* Checkbox at the top right of the card */}
                  <input
                    type="checkbox"
                    id="task2"
                    className="absolute top-2 right-2 w-4 h-4"
                  />
                  <div className="text-sm font-semibold text-gray-600">Name: <span className="font-normal">WorkoutName 2</span></div>
                  <div className="text-sm font-semibold text-gray-600">Equipment: <span className="font-normal">Kettlebell</span></div>
                  <div className="text-sm font-semibold text-gray-600">Duration: <span className="font-normal">30 minutes</span></div>
                  <div className="text-sm font-semibold text-gray-600">Description: <span className="font-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span></div>
                  <div className="text-sm font-semibold text-gray-600">Instructions: <span className="font-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti.</span></div>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
