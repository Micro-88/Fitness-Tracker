import mongoose, { Schema, model, models } from 'mongoose';

const workoutSchema = new Schema({
  title: String,
  reps: Number,
  load: Number,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Workout = models.Workout || model('Workout', workoutSchema);

export default Workout;
