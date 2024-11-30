import WorkoutPlan from '../../models/workoutPlan';
import Workout from '../../models/workout';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const workoutPlans = await WorkoutPlan.findAll({
      where: { userId },
      include: [{ model: Workout }],
    });

    res.status(200).json(workoutPlans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch workouts' });
  }
}
