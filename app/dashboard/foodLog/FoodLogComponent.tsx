"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GetUserProfileInToken, UserProfileModel } from '../../helpers/profile.helper';

const FoodLog: React.FC = () => {
  const [foodName, setFoodName] = useState<string>("");
  const [calories, setCalories] = useState<number | string>("");
  const [entries, setEntries] = useState<{ food_name: string; calories: number }[]>([]);
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<UserProfileModel | null>(null);

  // Fetch user profile on component mount
  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token) {
      router.push("/loginpage");
      return;
    }

    const profile = GetUserProfileInToken();
    setUserProfile(profile); // Set user profile here
  }, [router]);

  // Fetch food log whenever userProfile is updated
  useEffect(() => {
    const fetchFoodLog = async () => {
      if (!userProfile) return; // Ensure userProfile is set before making the request

      const formData = { userId: userProfile.id };

      try {
        const res = await fetch("/api/foodlog", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (res.ok) {
          setEntries(data.foodLogs); // Assuming foodLogs are returned in the response
        } else {
          console.error("Error fetching food log:", data.error || "Unknown error");
        }
      } catch (error) {
        console.error("Error fetching food log:", error);
      }
    };

    fetchFoodLog();
  }, [userProfile]);

  const handleAddEntry = async () => {
    if (!foodName || !calories) {
      alert("Please provide both food name and calories.");
      return;
    }

    try {
      const formData = {
        userId: userProfile?.id,
        foodName: foodName,
        calories: Number(calories),
      };

      const res = await fetch("/api/createFoodLogEntry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setEntries((prevEntries) => [
          ...prevEntries,
          { food_name: data.foodLog.food_name, calories: data.foodLog.calories },
        ]);
        setFoodName("");
        setCalories("");
      } else {
        alert(data.error || "Failed to add food entry");
      }
    } catch (error) {
      console.error("Error adding food entry:", error);
      alert("Failed to add food entry");
    }
  };

  return (
    <div className="font-sans p-6 max-w-2xl mx-auto">
      <h1 className="text-center text-white mb-8 text-4xl">Food Log</h1>

      <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-white text-2xl mb-5">Add Food Entry</h2>
        <div className="flex flex-col gap-4 text-black">
          <input
            type="text"
            placeholder="Food Name"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg text-lg w-full"
          />
          <input
            type="number"
            placeholder="Calories"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg text-lg w-full"
          />
          <button
            onClick={handleAddEntry}
            className="p-3 bg-blue-500 text-white rounded-lg text-lg cursor-pointer w-full sm:w-auto"
          >
            Add Entry
          </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-white text-2xl mb-5">Logged Foods</h2>
        {entries.length > 0 ? (
          <ul className="list-none p-0 text-white">
            {entries.map((entry, index) => (
              <li
                key={index}
                className="flex justify-between p-3 border-b border-gray-600 text-lg"
              >
                <span>{entry.food_name}</span>
                <span className="font-bold">{entry.calories} kcal</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 text-center text-lg">No food entries yet. Start adding some!</p>
        )}
      </div>
    </div>
  );
};

export default FoodLog;
