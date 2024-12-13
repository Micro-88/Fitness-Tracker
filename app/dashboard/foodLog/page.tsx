// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { GetUserProfileInToken } from "../../helpers/profile.helper";

// const FoodLog: React.FC = () => {
//   const [foodName, setFoodName] = useState<string>("");
//   const [calories, setCalories] = useState<number | string>("");
//   const [entries, setEntries] = useState<{ name: string; calories: number }[]>([]);
//   const router = useRouter();
//   const [userProfile, setUserProfile] = useState<any>(null);
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//     const token = localStorage.getItem("token") || sessionStorage.getItem("token");

//     if (!token) {
//       router.push("/loginpage");
//       return;
//     }

//     const profile = GetUserProfileInToken();
//     setUserProfile(profile); // Set user profile here

//     const fetchFoodLog = async () => {
//       if (!userProfile) return; // Ensure userProfile is set before making the request
//       const formData = { userId: userProfile.id };

//       try {
//         const res = await fetch('/api/foodlog', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(formData),
//         });

//         const data = await res.json();

//         if (res.ok) {
//           setEntries(data.foodLogs); // Assuming foodLogs are returned in the response
//         } else {
//           console.error('Error fetching food log:', data.error || 'Unknown error');
//         }
//       } catch (error) {
//         console.error('Error fetching food log:', error);
//       }
//     };

//     // Fetch food log data only after user profile is loaded
    
//   }, [router, userProfile]);

//   const handleAddEntry = async () => {
//     if (!foodName || !calories) {
//       alert('Please provide both food name and calories.');
//       return;
//     }

//     try {
//       const formData = {
//         userId: userProfile.id,
//         foodName: foodName,
//         calories: Number(calories),
//       };

//       // Send the food log data to the API
//       const res = await fetch('/api/createFoodLogEntry', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         // Update the entries list with the new food log entry
//         setEntries((prevEntries) => [
//           ...prevEntries,
//           { name: data.foodLog.food_name, calories: data.foodLog.calories },
//         ]);
//         setFoodName('');
//         setCalories('');
//       } else {
//         alert(data.error || 'Failed to add food entry');
//       }
//     } catch (error) {
//       console.error('Error adding food entry:', error);
//       alert('Failed to add food entry');
//     }
//   };

//   return (
//     <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
//       {/* Larger title for "Food Log" */}
//       <h1 style={{ textAlign: "center", color: "#0070f3", marginBottom: "30px", fontSize: "36px" }}>
//         Food Log
//       </h1>

//       <div
//         style={{
//           background: "#fff",
//           borderRadius: "8px",
//           boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//           padding: "20px",
//           marginBottom: "30px",
//         }}
//       >
//         {/* Larger subheading for "Add Food Entry" */}
//         <h2 style={{ fontSize: "24px", color: "#0070f3", marginBottom: "20px" }}>Add Food Entry</h2>
//         <div style={{ display: "flex", flexDirection: "column", gap: "15px", color: "black" }}>
//           <input
//             type="text"
//             placeholder="Food Name"
//             value={foodName}
//             onChange={(e) => setFoodName(e.target.value)}
//             style={{
//               padding: "12px",
//               border: "1px solid #ccc",
//               borderRadius: "4px",
//               fontSize: "18px",
//             }}
//           />
//           <input
//             type="number"
//             placeholder="Calories"
//             value={calories}
//             onChange={(e) => setCalories(e.target.value)}
//             style={{
//               padding: "12px",
//               border: "1px solid #ccc",
//               borderRadius: "4px",
//               fontSize: "18px",
//             }}
//           />
//           <button
//             onClick={handleAddEntry}
//             style={{
//               padding: "12px 18px",
//               backgroundColor: "#0070f3",
//               color: "#fff",
//               border: "none",
//               borderRadius: "4px",
//               fontSize: "18px",
//               cursor: "pointer",
//             }}
//           >
//             Add Entry
//           </button>
//         </div>
//       </div>

//       <div
//         style={{
//           background: "#fff",
//           borderRadius: "8px",
//           boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//           padding: "20px",
//         }}
//       >
//         {/* Larger subheading for "Logged Foods" */}
//         <h2 style={{ fontSize: "24px", color: "#0070f3", marginBottom: "20px" }}>Logged Foods</h2>
//         {entries.length > 0 ? (
//           <ul style={{ listStyleType: "none", padding: 0, color: "black" }}>
//             {entries.map((entry, index) => (
//               <li
//                 key={index}
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   padding: "12px",
//                   borderBottom: "1px solid #eee",
//                   fontSize: "18px",
//                 }}
//               >
//                 <span>{entry.name}</span>
//                 <span style={{ fontWeight: "bold" }}>{entry.calories} kcal</span>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p style={{ color: "#666", textAlign: "center", fontSize: "18px" }}>
//             No food entries yet. Start adding some!
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FoodLog;

