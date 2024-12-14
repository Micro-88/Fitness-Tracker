"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { GetUserProfileInToken } from './../helpers/profile.helper';
import { FaSpinner } from 'react-icons/fa'; // Import the spinner icon

Chart.register(...registerables);

const DashboardComponent: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State for loading
  const [checkboxStates, setCheckboxStates] = useState<Record<string, boolean>>({});
<<<<<<< HEAD
  const [chartData, setChartData] = useState<number[]>([0]); // Line chart data
  const [lineData, setLineData] = useState({
    labels: [], 
    datasets: [
      {
        label: "Progress",
        fill: false,
        backgroundColor: "rgb(165 243 252)",
        borderColor: "rgb(34 211 238)",
        data: [],
      },
    ],
  });
=======
  const [personalRecords, setPersonalRecords] = useState<any>(null); // State for personal records

>>>>>>> 7331d1358308475bd0cd1769eede7d300c5b1355
  interface Workout {
    workoutId: string;
    workoutName: string;
    equipment: string;
    duration: string;
    intensity: string;
    instructions: string;
    description: string;
    isCompleted: string;
    METscore: number; // Add METscore field
  }

  interface ChartDataEntry {
    date: Date;  // Or Date, depending on the format of the date
    progress: number;
  }

  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const router = useRouter();
  const userProfile = GetUserProfileInToken();

  const fetchWorkOuts = useCallback(async () => {
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

    const initialCheckboxStates: Record<string, boolean> = {};
    data.displayWorkouts.forEach((workout: { workoutId: string; isCompleted: boolean }) => {
      initialCheckboxStates[workout.workoutId] = workout.isCompleted;
    });
    setCheckboxStates(initialCheckboxStates);
  }, [userProfile.id]);

<<<<<<< HEAD
  const fetchChartData = useCallback(async () => {
    setIsLoading(true);
    const formData = {
      userId: userProfile.id,
    };
  
    try {
      const response = await fetch('/api/linedata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      setChartData(data.serializedData);

      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      console.log(chartData);
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');

      // const chartLabels = data.map((entry: ChartDataEntry) => entry.date); // Extract dates
      // const chartProgress = data.map((entry: ChartDataEntry) => entry.progress); 

    } catch (error) {
      setError("An error occurred while fetching chart data");
      console.error('Error fetching chart data:', error);
    } finally {
      setIsLoading(false);
=======
  const fetchPersonalRecords = useCallback(async () => {
    try {
      const res = await fetch(`/api/fetchPersonalRecords?userId=${userProfile.id}`);
      if (!res.ok) {
        throw new Error('Failed to fetch personal records');
      }
      const data = await res.json();
      setPersonalRecords(data);
    } catch (error) {
      console.error('Error fetching personal records:', error);
>>>>>>> 7331d1358308475bd0cd1769eede7d300c5b1355
    }
  }, [userProfile.id]);

  useEffect(() => {
    setIsClient(true);

    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    fetchWorkOuts();
<<<<<<< HEAD
    fetchChartData();
  }, [isClient, router, fetchWorkOuts, fetchChartData, userProfile?.id]);
=======
    fetchPersonalRecords(); // Fetch personal records
  }, [isClient, router, fetchWorkOuts, fetchPersonalRecords, userProfile?.id]);
>>>>>>> 7331d1358308475bd0cd1769eede7d300c5b1355

  if (!isClient) {
    return null;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // const getDaysOfWeek = () => {
  //   const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  //   const currentDate = new Date();
  //   const currentDayIndex = currentDate.getDay(); // Get the index of the current day
    
  //   // Create an array of the next 7 days, starting from Sunday
  //   return [
  //     ...daysOfWeek.slice(currentDayIndex), // Days from current day to Saturday
  //     ...daysOfWeek.slice(0, currentDayIndex) // Days from Sunday to the day before current day
  //   ];
  // };

  const lineOptions = {
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgb(250 250 250)",
        },
        ticks: {
          color: "#FFFFFF",
        },
      },
      x: {
        grid: {
          color: "rgb(250 250 250)",
        },
        ticks: {
          color: "#FFFFFF",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#FFFFFF",
        },
      },
      tooltip: {
        backgroundColor: "rgb(75 85 99)",
        titleColor: "#FFFFFF",
        bodyColor: "#FFFFFF",
      },
    },
  };

  const handleGenerateWorkout = () => {
    router.push('/workout_planner');
  };

  const handleCheckboxChange = async (workoutId: string, checked: boolean) => {
    try {
      const formData = { userId: userProfile.id, workoutId: workoutId, checked };

      const response = await fetch("/api/checkbox", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update workout status");
      }

      const data = await response.json();
      console.log(`Checkbox for workout ${workoutId} updated to ${checked}`);

      // Refetch the personal records to update the display
      await fetchPersonalRecords();
    } catch (error) {
      console.error("Error updating checkbox status:", error);
    }
  };

  const TodoList = () => {
    const refreshTodoList = async () => {
      setIsLoading(true);
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
        setIsLoading(false);
      }
    };

    return (
      <div className="bg-gray-800 shadow-md rounded-lg p-4 h-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">To-Do List</h2>
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
              onClick={refreshTodoList}
            >
              {isLoading ? (
                <FaSpinner className="animate-spin w-6 h-6 text-white" />
              ) : (
                "Refresh List"
              )}
            </button>
          </div>
        </div>

        <div className="border-t-2 border-gray-300 mb-4"></div>

        <ul className="space-y-4 h-96 overflow-y-auto">
          {workouts && workouts.length > 0 ? (
            workouts.map((workout) => (
              <li key={workout.workoutId} className="bg-gray-100 p-4 rounded-lg shadow-md relative">
                <input
                  type="checkbox"
                  id={`task${workout.workoutId}`}
                  className="absolute top-2 right-2 w-4 h-4"
                  checked={checkboxStates[workout.workoutId] || false}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    setCheckboxStates((prev) => ({
                      ...prev,
                      [workout.workoutId]: isChecked,
                    }));
                    handleCheckboxChange(workout.workoutId, isChecked);
                  }}
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
      <div className="md:w-1/2 p-4">
        <div className="bg-gray-800 shadow-md rounded-lg p-4 h-full">
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
            <p>Loading personal records...</p>
          )}
          <h2 className="text-lg font-semibold mb-4">Progress Graph</h2>
          <Line data={lineData} options={lineOptions} />
        </div>
      </div>

      <div className="md:w-1/2 p-4">
        <TodoList />
      </div>
    </div>
  );
};

export default DashboardComponent;