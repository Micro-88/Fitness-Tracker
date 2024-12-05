"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { GetUserProfileInToken } from "../helpers/profile.helper";


const WorkoutPlanner: React.FC = () => {
  const [goal, setGoal] = useState("");
  const [level, setLevel] = useState("");
  const [equipment, setEquipment] = useState<string[]>([]);
  const [userId, setUserId] = useState("");
  const [step, setStep] = useState(1);
  const [workoutPlan, setWorkoutPlan] = useState<string | null>(null); // To display the response
  const router = useRouter();

  const equipmentOptions = [
    "Barbells",
    "Dumbbells",
    "BodyWeight",
    "Machine",
    "Kettlebells",
    "Cables",
    "Bands",
  ];

  
  useEffect(() => {
    const userProfile = GetUserProfileInToken();
    setUserId(userProfile.id);
  });

  const totalSteps = 4; // Reduced total steps
  const progressPercentage = (step / totalSteps) * 100;

  const handleEquipmentChange = (item: string) => {
    setEquipment((prevEquipment) =>
      prevEquipment.includes(item)
        ? prevEquipment.filter((eq) => eq !== item)
        : [...prevEquipment, item]
    );
  };

  const selectAllEquipment = () => {
    setEquipment((prev) =>
      prev.length === equipmentOptions.length ? [] : equipmentOptions
    );
  };

  const nextStep = () => setStep((prevStep) => Math.min(prevStep + 1, totalSteps));
  const prevStep = () => setStep((prevStep) => Math.max(prevStep - 1, 1));

  const isStepValid = () => {
    switch (step) {
      case 1:
        return goal !== "";
      case 2:
        return level !== "";
      case 3:
        return equipment.length > 0;
      default:
        return true;
    }
  };


  
  const handleSubmit = async (e: React.FormEvent) => {
    const userInput = {
      goal,
      level,
      equipment,
      userId,
    };
  
    try {
      const response = await fetch("/api/workout-plans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInput),
      });
  
      if (!response.ok) {
        throw new Error("Failed to generate workout plan.");
      }
  
      const data = await response.json();
      setWorkoutPlan(data.output); // Display response from the server if needed

      const UID = GetUserProfileInToken();
      const formData = { userId: UID.id };

      const GenerateWorkout = await fetch("/api/generateWorkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Redirect to the dashboard after successful plan generation
      router.push('/dashboard');
      
    } catch (error) {
      console.error("Error generating workout plan:", error);
      setWorkoutPlan("Failed to generate a workout plan. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-900 text-white">
      <div className="bg-gray-800 shadow-md rounded-lg p-12 w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Workout Planner</h1>

        {/* Animated Progress Bar */}
        <div className="w-full bg-gray-600 rounded-full h-3 mb-6">
          <div
            className="bg-green-500 h-3 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        {/* Steps */}
        {step === 1 && (
          <div>
            <label className="block mb-2">Select Your Goal:</label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="border border-gray-400 bg-gray-100 text-black p-2 rounded w-full"
            >
              <option value="">Choose Goal</option>
              <option value="Lose_Weight">Lose Weight</option>
              <option value="Gain_Strength">Gain Strength</option>
              <option value="Gain_Muscle">Gain Muscle</option>
            </select>
          </div>
        )}

        {step === 2 && (
          <div>
            <label className="block mb-2">Select Your Level:</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="border border-gray-400 bg-gray-100 text-black p-2 rounded w-full"
            >
              <option value="">Choose Level</option>
              <option value="Novice">Novice</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        )}

        {step === 3 && (
          <div>
            <label className="block mb-2">Select Your Available Equipment:</label>
            <div>
              {equipmentOptions.map((item) => (
                <label key={item} className="block">
                  <input
                    type="checkbox"
                    checked={equipment.includes(item)}
                    onChange={() => handleEquipmentChange(item)}
                    className="mr-2"
                  />
                  {item}
                </label>
              ))}
            </div>
            <button onClick={selectAllEquipment} className="mt-3 text-green-500">
              {equipment.length === equipmentOptions.length
                ? "Deselect All"
                : "Select All"}
            </button>
          </div>
        )}

        <div className="mt-6 flex justify-between">
          <button
            onClick={prevStep}
            disabled={step === 1}
            className="bg-gray-600 text-white p-3 rounded"
          >
            Previous
          </button>
          {step === totalSteps ? (
            <button
            onClick={handleSubmit}
            disabled={!isStepValid()}
            className={`bg-green-500 text-white p-3 rounded ${!isStepValid() && "opacity-50 cursor-not-allowed"}`}
          >
            Generate Plan
          </button>
          ) : (
            <button
              onClick={nextStep}
              disabled={!isStepValid()}
              className={`bg-blue-500 text-white p-3 rounded ${
                !isStepValid() && "opacity-50 cursor-not-allowed"
              }`}
            >
              Next
            </button>
          )}
        </div>

        {workoutPlan && (
          <div className="mt-6 p-3 bg-gray-800 rounded-lg text-center">
            <h3 className="text-xl font-bold">Workout Plan</h3>
            <p>{workoutPlan}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutPlanner;
