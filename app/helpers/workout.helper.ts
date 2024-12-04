// workout.helper.ts
export async function GetUserWorkouts(userId: string): Promise<WorkoutModel[]> {
    try {
      const formData = { userId };
      const res = await fetch('/api/dashboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!res.ok) {
        throw new Error('Failed to fetch workouts');
      }
  
      const data = await res.json();
      return data.workouts as WorkoutModel[];
    } catch (error) {
      console.error('Error fetching workouts:', error);
      return [];
    }
  }
  
  // WorkoutModel Interface
  export interface WorkoutModel {
    id: string;
    name: string;
    description: string;
    goal: string;
    level: string;
    equipment: string;
    duration: number;
    muscleGroup: string;
    instructions: string;
  }
  
  