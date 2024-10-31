// app/dashboard/page.tsx

"use client"; // Add this directive to make the component a Client Component

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2'; // Import Line chart
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const Dashboard = () => {
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
          <div className="bg-white shadow-md rounded-lg p-4 h-full flex flex-col items-center justify-center">
            <h2 className="text-lg font-semibold mb-4">Generate Workout</h2>
            <button 
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={handleGenerateWorkout}
            >
              Generate Workout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
