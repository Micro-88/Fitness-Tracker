"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { GetUserProfileInToken } from './../helpers/profile.helper';
import { FaSpinner } from 'react-icons/fa'; // Import the spinner icon

Chart.register(...registerables);

const Dashboard: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State for loading
  const [personalRecords, setPersonalRecords] = useState<any>(null); // State for personal records
  interface Workout {
    workoutId: string;
    workoutName: string;
    equipment: string;
    duration: string;
    intensity: string;
    instructions: string;
    description: string;
    caloriesBurned: string;
    isCompleted: number; // Add isCompleted field
  }

  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const router = useRouter();
  const userProfile = GetUserProfileInToken();

  useEffect(() => {
    setIsClient(true);
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    if (!token) {
      router.push('/loginpage');
      return;
    }

    fetchWorkOuts();
    fetchPersonalRecords(); // Fetch personal records

  }, [router]);

  const fetchWorkOuts = async () => {
    const formData = {
      userId: userProfile.id
    }
    const res = await fetch('/api/dashboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    setWorkouts(data.displayWorkouts);
  }

  const fetchPersonalRecords = async () => {
    try {
      const res = await fetch(`/api/fetchPersonalRecords?userId=${userProfile.id}`);
      if (!res.ok) {
        throw new Error('Failed to fetch personal records');
      }
      const data = await res.json();
      console.log('Fetched personal records:', data); // Debugging log
      setPersonalRecords(data);
    } catch (error) {
      console.error('Error fetching personal records:', error);
    }
  };

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
      setIsLoading(true);
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

        fetchWorkOuts();

      } catch (error) {
        console.error('Error refreshing workouts:', error);
        setError('Failed to refresh workouts');
      } finally {
        setIsLoading(false); // Stop loading after the process is complete
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
              {isLoading ? (
                <FaSpinner className="animate-spin w-6 h-6 text-white" />
              ) : (
                "Refresh List"
              )}
            </button>
          </div>
        </div>

        <WorkoutList workouts={workouts} userProfile={userProfile} fetchPersonalRecords={fetchPersonalRecords} setPersonalRecords={setPersonalRecords} />
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Box with Analytics Chart */}
      <div className="md:w-1/2 p-4">
        <div className="bg-white shadow-md rounded-lg p-4 h-full">
        {personalRecords ? (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-4">Personal Records</h2>
          <div className="text-sm font-semibold text-gray-600">
            Total Calories Burned: <span className="font-normal">{personalRecords.totalCaloriesBurned}</span>
          </div>
          <div className="text-sm font-semibold text-gray-600">
            Total Workout Duration: <span className="font-normal">{personalRecords.totalWorkoutDuration}</span>
          </div>
          <div className="text-sm font-semibold text-gray-600">
            Total Workouts Finished: <span className="font-normal">{personalRecords.totalWorkoutsFinished}</span>
          </div>
        </div>
      ) : (
        <p>Loading personal records...</p> // Debugging log
      )}
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

const WorkoutList = ({ workouts, userProfile, setPersonalRecords, fetchPersonalRecords }) => {
  const [workoutList, setWorkoutList] = useState(workouts);
  const [checkboxState, setCheckboxState] = useState(() => {
    const savedState = localStorage.getItem('checkboxState');
    return savedState ? JSON.parse(savedState) : {};
  });

  const handleCheckboxChange = async (workoutId, isChecked) => {
    try {
      // Update the generated workout
      const workoutResponse = await fetch('/api/updateWorkout', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          workoutId: parseInt(workoutId, 10), // Ensure workoutId is a number
          isCompleted: isChecked ? 1 : 0, // Ensure isCompleted is a number
        }),
      });

      if (!workoutResponse.ok) {
        throw new Error('Failed to update workout');
      }

      // Save the checkbox state to local storage
      const updatedCheckboxState = { ...checkboxState, [workoutId]: isChecked };
      localStorage.setItem('checkboxState', JSON.stringify(updatedCheckboxState));
      setCheckboxState(updatedCheckboxState);

      // Update the local state to reflect the change
      setWorkoutList((prevWorkouts) =>
        prevWorkouts.map((workout) =>
          workout.workoutId === workoutId
            ? { ...workout, isCompleted: isChecked ? 1 : 0 }
            : workout
        )
      );

      // Fetch updated personal records
      const personalRecordsResponse = await fetch(`/api/fetchPersonalRecords?userId=${userProfile.id}`);
      if (!personalRecordsResponse.ok) {
        throw new Error('Failed to fetch personal records');
      }
      const updatedPersonalRecords = await personalRecordsResponse.json();
      setPersonalRecords(updatedPersonalRecords);
    } catch (error) {
      console.error('Error updating workout:', error);
    }
  };

  return (
    <div>
      {/* Divider Bar */}
      <div className="border-t-2 border-gray-300 mb-4"></div>

      {/* Workout Details List */}
      <ul className="space-y-4 h-96 overflow-y-auto">
        {workoutList && workoutList.length > 0 ? (
          workoutList.map((workout) => (
            <li key={workout.workoutId} className="bg-gray-100 p-4 rounded-lg shadow-md relative">
              {/* Checkbox at the top right of the card */}
              <input
                type="checkbox"
                id={`task${workout?.workoutId}`}
                className="absolute top-2 right-2 w-4 h-4"
                checked={checkboxState[workout.workoutId] || workout.isCompleted === 1}
                onChange={(e) => handleCheckboxChange(workout.workoutId, e.target.checked)}
              />
              <div className="text-sm font-semibold text-gray-600">
                Name: <span className="font-normal">{workout.workoutName}</span>
              </div>
              <div className="text-sm font-semibold text-gray-600">
                Equipment: <span className="font-normal">{workout.equipment}</span>
              </div>
              <div className="text-sm font-semibold text-gray-600">
                Duration: <span className="font-normal">{workout.duration}</span>
              </div>
              <div className="text-sm font-semibold text-gray-600">
                Intensity: <span className="font-normal">{workout.intensity}</span>
              </div>
              <div className="text-sm font-semibold text-gray-600">
                Instruction: <span className="font-normal">{workout.instructions}</span>
              </div>
              <div className="text-sm font-semibold text-gray-600">
                Description: <span className="font-normal">{workout.description}</span>
              </div>
              <div className="text-sm font-semibold text-gray-600">
                Calories Burned: <span className="font-normal">{workout.caloriesBurned}</span>
              </div>
            </li>
          ))
        ) : (
          <li>No workouts available</li>
        )}
      </ul>
    </div>
  );
};

export default Dashboard;