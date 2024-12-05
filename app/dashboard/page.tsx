"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { GetUserProfileInToken } from './../helpers/profile.helper';
// import { GetUserWorkouts } from '../helpers/workout.helper';

Chart.register(...registerables);

const Dashboard: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  interface Workout {
    id: string;
    name: string;
    equipment: string;
    duration: string;
    description: string;
    instructions: string;
  }

  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const router = useRouter();
  const userProfile = GetUserProfileInToken();
  // const workout2 = GetUserWorkouts(userProfile.id);

  useEffect(() => {
    setIsClient(true);
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    if (!token) {
      router.push('/loginpage');
      return;
    }

    console.log('!!!!!!!TEST START HERE!!!!!!!!!');
    console.log(userProfile);

    fetchWorkOuts();


    console.log('!!!!!!!TEST END HERE!!!!!!!!!');
    // Token verification is now handled by middleware/authMiddleware.ts
  }, [router]);

  const fetchWorkOuts = async() => {
    const formData = {
      userId: userProfile.id
    }
    const res = await fetch('/api/dashboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)}
    );
    const data = await res.json();
    setWorkouts(data.workouts);
}

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
    router.push('/workout_planner');
  };

  const TodoList = () => {
    const refreshTodoList = async () => {
      // Make a request to the /api/generateWorkout endpoint to refresh the workout data
      try {
        const formData = { userId: userProfile.id };
  
        const response = await fetch('/api/generateWorkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (!response.ok) {
          throw new Error('Failed to generate workout');
        }
  
        // Get the data from the response
        const data = await response.json();
  
        // Update the workouts list with the new data
        setWorkouts(data.workouts);

      } catch (error) {
        console.error('Error refreshing workouts:', error);
        setError('Failed to refresh workouts');
      }
    };

    return (
      <div className="bg-white shadow-md rounded-lg p-4 h-full">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg text-black font-semibold">To-Do List</h2>
          <div className="flex space-x-4">
            <button
              className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
              onClick={() => console.log("Edit Workout")}
            >
              Edit Workout
            </button>
            <button
              className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
              onClick={handleGenerateWorkout}
            >
              Generate New Plan
            </button>
            <button
              className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
              onClick={refreshTodoList} // Trigger the refresh function
            >
              Refresh List
            </button>
          </div>
        </div>

        {/* Divider Bar */}
        <div className="border-t-2 border-gray-300 mb-4"></div>

        {/* Workout Details List */}
        <ul className="space-y-4 h-96 overflow-y-auto">
          {workouts && workouts.length > 0 ? (
            workouts.map((workout) => (
              <li key={workout.id} className="bg-gray-100 p-4 rounded-lg shadow-md relative">
                {/* Checkbox at the top right of the card */}
                <input
                  type="checkbox"
                  id={`task${workout?.id}`}
                  className="absolute top-2 right-2 w-4 h-4"
                />
                <div className="text-sm font-semibold text-gray-600">
                  Name: <span className="font-normal">{workout.name}</span>
                </div>
                <div className="text-sm font-semibold text-gray-600">
                  Equipment: <span className="font-normal">{workout.equipment}</span>
                </div>
                <div className="text-sm font-semibold text-gray-600">
                  Duration: <span className="font-normal">{workout.duration}</span>
                </div>
                <div className="text-sm font-semibold text-gray-600">
                  Description: <span className="font-normal">{workout.description}</span>
                </div>
                <div className="text-sm font-semibold text-gray-600">
                  Instructions: <span className="font-normal">{workout.instructions}</span>
                </div>
              </li>
            ))
          ) : (
            <p>No workouts available.</p>
          )}
        </ul>
      </div>
    );
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

      {/* Right Box with To-Do List */}
      <div className="md:w-1/2 p-4">
        <TodoList />
      </div>
    </div>
  );
};

export default Dashboard;
