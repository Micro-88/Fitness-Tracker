"use client";

import React, { useState } from "react";

const WorkoutPlanner: React.FC = () => {
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [goal, setGoal] = useState("");
  const [level, setLevel] = useState("");
  const [equipment, setEquipment] = useState<string[]>([]);
  const [step, setStep] = useState(1);
  const [workoutPlan, setWorkoutPlan] = useState<string | null>(null); // To display the response

  const equipmentOptions = [
    "Barbells",
    "Dumbbells",
    "BodyWeight",
    "Machine",
    "Kettlebells",
    "Cables",
    "Bands",
  ];

  const totalSteps = 6;
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
        return gender !== "";
      case 2:
        return age !== "" && parseInt(age) > 0;
      case 3:
        return goal !== "";
      case 4:
        return level !== "";
      case 5:
        return equipment.length > 0;
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    const userInput = {
      gender,
      age,
      goal,
      level,
      equipment,
    };

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          body: `Create a workout plan for the following: Gender: ${gender}, Age: ${age}, Goal: ${goal}, Level: ${level}, Equipment: ${equipment.join(", ")}.`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate workout plan.");
      }

      const data = await response.json();
      setWorkoutPlan(data.output);
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
            <label className="block mb-2">Select Your Gender:</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="border border-gray-400 bg-gray-100 text-black p-2 rounded w-full"
            >
              <option value="">Choose Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        )}

        {step === 2 && (
          <div>
            <label className="block mb-2">Enter Your Age:</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="border border-gray-400 bg-gray-100 text-black p-2 rounded w-full"
              min="1"
            />
          </div>
        )}

        {step === 3 && (
          <div>
            <label className="block mb-2">Select Your Goal:</label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="border border-gray-400 bg-gray-100 text-black p-2 rounded w-full"
            >
              <option value="">Choose Goal</option>
              <option value="Lose Weight">Lose Weight</option>
              <option value="Gain Strength">Gain Strength</option>
              <option value="Gain Muscle">Gain Muscle</option>
            </select>
          </div>
        )}

        {step === 4 && (
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

        {step === 5 && (
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
            <button onClick={selectAllEquipment} className="mt-2">
              {equipment.length === equipmentOptions.length
                ? "Unselect All"
                : "Select All"}
            </button>
          </div>
        )}

        {step === 6 && (
          <div>
            <p>Review your choices and submit to generate your workout plan.</p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-4 flex justify-between">
          {step > 1 && (
            <button onClick={prevStep} className="p-2 bg-gray-700 rounded">
              Previous
            </button>
          )}
          {step < totalSteps ? (
            <button
              onClick={nextStep}
              disabled={!isStepValid()}
              className={`p-2 rounded ${
                isStepValid() ? "bg-green-500" : "bg-gray-500 cursor-not-allowed"
              }`}
            >
              Next
            </button>
          ) : (
            <button onClick={handleSubmit} className="p-2 bg-blue-500 rounded">
              Submit
            </button>
          )}
        </div>

        {/* Display Workout Plan */}
        {workoutPlan && (
          <div className="mt-6 bg-gray-700 p-4 rounded">
            <h2 className="text-lg font-bold">Generated Workout Plan:</h2>
            <p className="mt-2">{workoutPlan}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutPlanner;
