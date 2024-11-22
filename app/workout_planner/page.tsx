"use client";

import React, { useState } from 'react';

const WorkoutPlanner: React.FC = () => {
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [goal, setGoal] = useState('');
  const [level, setLevel] = useState('');
  const [equipment, setEquipment] = useState<string[]>([]);
  const [step, setStep] = useState(1);

  const equipmentOptions = [
    "Barbells", 
    "Dumbbells",
    "BodyWeight",
    "Machine",
    "Kettlebells",
    "Cables",
    "Bands"
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
    if (equipment.length === equipmentOptions.length) {
      setEquipment([]); // Unselect all if already selected
    } else {
      setEquipment(equipmentOptions); // Select all
    }
  };

  const nextStep = () => setStep((prevStep) => Math.min(prevStep + 1, totalSteps));
  const prevStep = () => setStep((prevStep) => Math.max(prevStep - 1, 1));

  // Check if current step is valid to enable the "Next" button
  const isStepValid = () => {
    switch (step) {
      case 1:
        return gender !== '';
      case 2:
        return age !== '' && parseInt(age) > 0;
      case 3:
        return goal !== '';
      case 4:
        return level !== '';
      case 5:
        return equipment.length > 0;
      default:
        return true;
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

        {/* Step Sections */}
        {step === 1 && (
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Select Your Gender:</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="border border-gray-600 bg-gray-700 text-white p-2 rounded w-full"
            >
              <option value="">Choose Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        )}

        {step === 2 && (
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Enter Your Age:</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="border border-gray-600 bg-gray-700 text-white p-2 rounded w-full"
              min="1"
            />
          </div>
        )}

        {step === 3 && (
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Select Your Goal:</label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="border border-gray-600 bg-gray-700 text-white p-2 rounded w-full"
            >
              <option value="">Choose Goal</option>
              <option value="Lose Weight">Lose Weight</option>
              <option value="Gain Strength">Gain Strength</option>
              <option value="Gain Muscle">Gain Muscle</option>
            </select>
          </div>
        )}

        {step === 4 && (
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Select Your Level:</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="border border-gray-600 bg-gray-700 text-white p-2 rounded w-full"
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
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Select Your Available Equipment:</label>
            <div className="grid grid-cols-2 gap-2">
              {equipmentOptions.map((item) => (
                <label key={item} className="flex items-center">
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
            <label className="flex items-center mt-3">
              <input
                type="checkbox"
                checked={equipment.length === equipmentOptions.length}
                onChange={selectAllEquipment}
                className="mr-2"
              />
              Select All
            </label>
          </div>
        )}

        {/* Final Step Confirmation Message */}
        {step === 6 && (
          <div className="mb-4 text-center">
            <h2 className="text-xl font-semibold text-green-500">Congratulations!</h2>
            <p className="text-gray-300 mt-2">Your workout plan has been generated.</p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              onClick={prevStep}
              className="bg-gray-600 text-white px-4 py-2 rounded"
            >
              Previous
            </button>
          )}
          {step < totalSteps ? (
            <button
              onClick={nextStep}
              disabled={!isStepValid()}
              className={`px-4 py-2 rounded ${
                isStepValid() ? "bg-green-500 text-white" : "bg-gray-500 text-gray-300 cursor-not-allowed"
              }`}
            >
              Next
            </button>
          ) : (
            <button
              onClick={() => alert('Workout plan confirmed!')}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkoutPlanner;