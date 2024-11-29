"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Doughnut, Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const Dashboard: React.FC = () => {
  const [workoutGenerated, setWorkoutGenerated] = useState(false);
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


  // Sample data for the doughnut chart
  const doughnutData = {
    labels: ["Workout A", "Workout B", "Workout C"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
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
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
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
          <div className="bg-white shadow-md rounded-lg p-4 h-full max-h-[300px] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Progress Graph</h2>
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>

        {/* Bottom Right Box */}
        <div className="flex-[2] p-4">
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
                  <button
                    className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
                    onClick={() => setWorkoutGenerated(false)}
                  >
                    Edit Workout
                  </button>
                </div>
                <ul className="space-y-2">
                  <li className="text-black flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      id="task1"
                    />
                    <label htmlFor="task1">Lorem ipsum dolor sit amet.</label>
                  </li>
                  <li className="text-black flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      id="task2"
                    />
                    <label htmlFor="task2">
                      Consectetur adipiscing elit, sed do.
                    </label>
                  </li>
                  <li className="text-black flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      id="task3"
                    />
                    <label htmlFor="task3">Eiusmod tempor incididunt ut.</label>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
