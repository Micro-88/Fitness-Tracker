'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Workouts', [
      { name: 'Jumping Jacks', description: 'A cardio exercise for overall fitness.', goal: 'Lose_Weight', level: 'Novice', equipment: 'BodyWeight', duration: 10, muscleGroup: 'UpperBody', instructions: 'Jump with your legs and arms wide.', METscore: 8 },
      { name: 'Mountain Climbers', description: 'A fast-paced cardio exercise targeting the core.', goal: 'Lose_Weight', level: 'Beginner', equipment: 'BodyWeight', duration: 15, muscleGroup: 'UpperBody', instructions: 'Drive knees toward the chest, alternating legs.', METscore: 8 },
      { name: 'Burpees', description: 'High-intensity full-body exercise for fat loss.', goal: 'Lose_Weight', level: 'Intermediate', equipment: 'BodyWeight', duration: 20, muscleGroup: 'Legs', instructions: 'Squat, jump to plank, push-up, jump up.', METscore: 10 },
      { name: 'High Knees', description: 'Cardio workout targeting lower body and core.', goal: 'Lose_Weight', level: 'Advanced', equipment: 'BodyWeight', duration: 30, muscleGroup: 'Legs', instructions: 'Run in place while lifting knees to waist height.', METscore: 8 },
      { name: 'Running', description: 'A classic cardio exercise for endurance and fat loss.', goal: 'Lose_Weight', level: 'Beginner', equipment: 'BodyWeight', duration: 30, muscleGroup: 'Legs', instructions: 'Run continuously or alternate with walking.', METscore: 9 },

      // Workouts for Gain Strength
      { name: 'Pushups', description: 'Classic strength training exercise for upper body.', goal: 'Gain_Strength', level: 'Novice', equipment: 'BodyWeight', duration: 10, muscleGroup: 'UpperBody', instructions: 'Lower yourself to the ground and push back up.', METscore: 3.8 },
      { name: 'Plank', description: 'Strengthen the core and back.', goal: 'Gain_Strength', level: 'Beginner', equipment: 'BodyWeight', duration: 30, muscleGroup: 'Core', instructions: 'Hold a stable plank position with arms straight.', METscore: 3 },
      { name: 'Dumbbell Shoulder Press', description: 'Strengthens shoulders and arms.', goal: 'Gain_Strength', level: 'Intermediate', equipment: 'Dumbbells', duration: 15, muscleGroup: 'UpperBody', instructions: 'Lift dumbbells overhead, extending arms fully.', METscore: 6 },
      { name: 'Deadlifts', description: 'Strength training for back and legs.', goal: 'Gain_Strength', level: 'Advanced', equipment: 'Barbells', duration: 15, muscleGroup: 'Legs', instructions: 'Lift a barbell from the ground to your thighs.', METscore: 6 },
      { name: 'Squats', description: 'Lower body strength training exercise.', goal: 'Gain_Strength', level: 'Beginner', equipment: 'BodyWeight', duration: 20, muscleGroup: 'Legs', instructions: 'Bend knees and lower hips, then stand back up.', METscore: 5 },

      // Workouts for Gain Muscle
      { name: 'Pullups', description: 'Upper body strength exercise for back and arms.', goal: 'Gain_Muscle', level: 'Novice', equipment: 'BodyWeight', duration: 10, muscleGroup: 'Back', instructions: 'Pull yourself up on a bar until chin is above the bar.', METscore: 5 },
      { name: 'Chest Press', description: 'Strengthen the chest with this machine exercise.', goal: 'Gain_Muscle', level: 'Intermediate', equipment: 'Machine', duration: 15, muscleGroup: 'UpperBody', instructions: 'Press the bar away from your chest and back slowly.', METscore: 6 },
      { name: 'Barbell Row', description: 'Pull a barbell towards the torso, strengthening back muscles.', goal: 'Gain_Muscle', level: 'Intermediate', equipment: 'Barbells', duration: 15, muscleGroup: 'Back', instructions: 'Row the barbell toward your body, keeping elbows close.', METscore: 6 },
      { name: 'Bicep Curls', description: 'Arm workout using dumbbells for bicep strengthening.', goal: 'Gain_Muscle', level: 'Beginner', equipment: 'Dumbbells', duration: 10, muscleGroup: 'Arms', instructions: 'Curl the dumbbells from waist to shoulder level.', METscore: 3.5 },
      { name: 'Leg Press', description: 'Machine-based leg workout targeting quads and glutes.', goal: 'Gain_Muscle', level: 'Advanced', equipment: 'Machine', duration: 20, muscleGroup: 'Legs', instructions: 'Press weight upward using legs while seated.', METscore: 4 },

      // Workouts for Novice Level
      { name: 'Walking', description: 'Low-intensity walking for beginners.', goal: 'Lose_Weight', level: 'Novice', equipment: 'BodyWeight', duration: 30, muscleGroup: 'Legs', instructions: 'Walk at a moderate pace to improve endurance.', METscore: 3.5 },
      { name: 'Leg Curls', description: 'Machine-based leg strengthening workout.', goal: 'Gain_Strength', level: 'Novice', equipment: 'Machine', duration: 15, muscleGroup: 'Legs', instructions: 'Curl your legs upward while seated on the machine.', METscore: 3 },
      { name: 'Resistance Band Squats', description: 'Use a resistance band to strengthen the legs.', goal: 'Gain_Muscle', level: 'Novice', equipment: 'Bands', duration: 15, muscleGroup: 'Legs', instructions: 'Squat with the band around your thighs for added resistance.', METscore: 4 },
      { name: 'Bicycle Crunches', description: 'Core workout to target abdominal muscles.', goal: 'Lose_Weight', level: 'Novice', equipment: 'BodyWeight', duration: 10, muscleGroup: 'Core', instructions: 'Alternate legs while twisting your torso to touch your knees.', METscore: 8 },
      { name: 'Dumbbell Lunges', description: 'Lunge forward with dumbbells for leg strength.', goal: 'Gain_Strength', level: 'Novice', equipment: 'Dumbbells', duration: 20, muscleGroup: 'Legs', instructions: 'Step forward into a lunge position, alternating legs.', METscore: 4 },      
      
      // Additional Workouts for Beginner Level
      { name: 'Bodyweight Squats', description: 'A simple leg exercise to strengthen the lower body.', goal: 'Gain_Strength', level: 'Beginner', equipment: 'BodyWeight', duration: 15, muscleGroup: 'Legs', instructions: 'Stand with feet shoulder-width apart and lower into a squat.', METscore: 4 },
      { name: 'Dumbbell Deadlifts', description: 'A lower body exercise to target the hamstrings and glutes.', goal: 'Gain_Strength', level: 'Beginner', equipment: 'Dumbbells', duration: 20, muscleGroup: 'Legs', instructions: 'Hold dumbbells in front of you and lower them toward the ground while keeping your back straight.', METscore: 4.5 },
      { name: 'Lunges', description: 'A lower-body exercise to target quads and glutes.', goal: 'Gain_Strength', level: 'Beginner', equipment: 'BodyWeight', duration: 15, muscleGroup: 'Legs', instructions: 'Step forward with one leg, bend both knees to 90°, and then return to standing.', METscore: 4 },
      { name: 'Plank with Shoulder Taps', description: 'A core-strengthening exercise targeting the abs and shoulders.', goal: 'Gain_Strength', level: 'Beginner', equipment: 'BodyWeight', duration: 20, muscleGroup: 'Core', instructions: 'In a plank position, alternate tapping each shoulder with the opposite hand.', METscore: 3.8 },
      { name: 'Dumbbell Row', description: 'Strengthens the back and arms using dumbbells.', goal: 'Gain_Strength', level: 'Beginner', equipment: 'Dumbbells', duration: 15, muscleGroup: 'Back', instructions: 'Bend forward and pull the dumbbell toward your body, focusing on squeezing the shoulder blades.', METscore: 5 },

      // Additional Workouts for Intermediate Level
      { name: 'Kettlebell Swings', description: 'A full-body exercise that targets the hips, glutes, and core.', goal: 'Gain_Strength', level: 'Intermediate', equipment: 'Kettlebells', duration: 20, muscleGroup: 'Core', instructions: 'Swing the kettlebell from between your legs up to chest level, keeping your back straight.', METscore: 6 },
      { name: 'Cable Rows', description: 'A back exercise using the cable machine to target the lats and biceps.', goal: 'Gain_Strength', level: 'Intermediate', equipment: 'Cables', duration: 20, muscleGroup: 'Back', instructions: 'Pull the cable towards you, keeping your elbows close to your body and squeezing your shoulder blades together.', METscore: 5.5 },
      { name: 'Machine Chest Press', description: 'Strengthens the chest and arms using the chest press machine.', goal: 'Gain_Strength', level: 'Intermediate', equipment: 'Machine', duration: 15, muscleGroup: 'UpperBody', instructions: 'Press the handles of the machine away from your chest, then return to the starting position.', METscore: 6 },
      { name: 'Kettlebell Goblet Squats', description: 'A lower-body exercise that strengthens the legs and glutes while using a kettlebell.', goal: 'Gain_Strength', level: 'Intermediate', equipment: 'Kettlebells', duration: 20, muscleGroup: 'Legs', instructions: 'Hold the kettlebell at chest level and squat down, keeping your back straight and chest up.', METscore: 5 },

      // Workouts for Advanced Level
      { name: 'Bench Press', description: 'Upper body strength exercise with a barbell.', goal: 'Gain_Muscle', level: 'Advanced', equipment: 'Barbells', duration: 15, muscleGroup: 'UpperBody', instructions: 'Lower the barbell to your chest and push it back up.', METscore: 6.5 },
      { name: 'Clean and Press', description: 'Full-body strength exercise with a barbell.', goal: 'Gain_Strength', level: 'Advanced', equipment: 'Barbells', duration: 20, muscleGroup: 'UpperBody', instructions: 'Clean the barbell and press it overhead in one motion.', METscore: 7 },
      { name: 'Jump Squats', description: 'Explosive leg workout for building muscle.', goal: 'Gain_Muscle', level: 'Advanced', equipment: 'BodyWeight', duration: 20, muscleGroup: 'Legs', instructions: 'Squat and then jump as high as possible.', METscore: 6 },
      { name: 'Deadlifts with Dumbbells', description: 'A heavy compound exercise for back and legs.', goal: 'Gain_Strength', level: 'Advanced', equipment: 'Dumbbells', duration: 15, muscleGroup: 'Legs', instructions: 'Lift dumbbells from the ground to your waist.', METscore: 6.5 },

      // Workouts for Kettlebells Equipment
      { name: 'Kettlebell Deadlifts', description: 'Strengthen your back and legs with kettlebells.', goal: 'Gain_Strength', level: 'Intermediate', equipment: 'Kettlebells', duration: 20, muscleGroup: 'Legs', instructions: 'Lift the kettlebells from the ground to your waist.', METscore: 6 },
      { name: 'Kettlebell Snatch', description: 'Powerful full-body movement for strength and coordination.', goal: 'Gain_Muscle', level: 'Intermediate', equipment: 'Kettlebells', duration: 15, muscleGroup: 'UpperBody', instructions: 'Swing the kettlebell from between your legs and snatch it overhead.', METscore: 7 },

      
      // Additional Workouts for Barbells
      { name: 'Barbell Squats', description: 'A lower-body exercise that targets quads and glutes using a barbell.', goal: 'Gain_Strength', level: 'Intermediate', equipment: 'Barbells', duration: 25, muscleGroup: 'Legs', instructions: 'Position the barbell on your upper back and squat down, keeping your knees behind your toes.', METscore: 6.0 }, 
      { name: 'Barbell Bench Press', description: 'Strengthens the chest and arms using a barbell.', goal: 'Gain_Strength', level: 'Intermediate', equipment: 'Barbells', duration: 20, muscleGroup: 'UpperBody', instructions: 'Lie on a bench and lower the barbell to your chest, then press it back up.', METscore: 5.8 }, 
      { name: 'Barbell Deadlifts', description: 'A full-body exercise that targets the hamstrings, glutes, and back using a barbell.', goal: 'Gain_Strength', level: 'Advanced', equipment: 'Barbells', duration: 30, muscleGroup: 'Back', instructions: 'Bend at the hips and knees, grip the barbell, and lift it while maintaining a straight back.', METscore: 6.0 },


      // Additional Workouts for Dumbbells
      { name: 'Dumbbell Bicep Curls', description: 'Strengthens the arms, specifically the biceps, using dumbbells.', goal: 'Gain_Strength', level: 'Beginner', equipment: 'Dumbbells', duration: 15, muscleGroup: 'Arm', instructions: 'Hold a dumbbell in each hand and curl them towards your shoulders, focusing on squeezing your biceps.', METscore: 3.8 }, 
      { name: 'Dumbbell Lateral Raises', description: 'Strengthens the shoulders using dumbbells.', goal: 'Gain_Strength', level: 'Intermediate', equipment: 'Dumbbells', duration: 15, muscleGroup: 'UpperBody', instructions: 'Lift dumbbells out to the side until they are shoulder height, then lower them slowly.', METscore: 4.0 },


      // Additional Workouts for Machines
      { name: 'Leg Press Machine', description: 'Strengthens the legs using the leg press machine.', goal: 'Gain_Strength', level: 'Beginner', equipment: 'Machine', duration: 20, muscleGroup: 'Legs', instructions: 'Sit on the machine, place your feet shoulder-width apart, and push the platform away.', METscore: 4.5 }, 
      { name: 'Lat Pulldown', description: 'Targets the back muscles using the lat pulldown machine.', goal: 'Gain_Strength', level: 'Intermediate', equipment: 'Machine', duration: 20, muscleGroup: 'Back', instructions: 'Pull the bar down towards your chest, keeping your torso upright and shoulder blades squeezed.', METscore: 4.8 }, 
      { name: 'Seated Row Machine', description: 'Strengthens the back and arms using the seated row machine.', goal: 'Gain_Strength', level: 'Intermediate', equipment: 'Machine', duration: 25, muscleGroup: 'Back', instructions: 'Pull the handles towards you while sitting upright, squeezing your shoulder blades together.', METscore: 4.9 },
      
      // Additional Workouts for Cables
      { name: 'Cable Chest Fly', description: 'Strengthens the chest and arms using the cable machine.', goal: 'Gain_Strength', level: 'Intermediate', equipment: 'Cables', duration: 20, muscleGroup: 'UpperBody', instructions: 'Hold the cable handles, and pull them together in front of your chest, squeezing your pectoral muscles.', METscore: 4.8 }, 
      { name: 'Cable Tricep Pushdowns', description: 'Targets the triceps using the cable machine.', goal: 'Gain_Strength', level: 'Beginner', equipment: 'Cables', duration: 15, muscleGroup: 'UpperBody', instructions: 'Push the cable handle down toward your thighs, keeping your elbows close to your body.', METscore: 3.8 }, 
      { name: 'Cable Face Pull', description: 'A shoulder exercise that targets the rear delts and upper back using the cable machine.', goal: 'Gain_Strength', level: 'Intermediate', equipment: 'Cables', duration: 20, muscleGroup: 'UpperBody', instructions: 'Pull the rope towards your face, keeping your elbows high and squeezing your shoulder blades.', METscore: 4.5 },

      // Additional Workouts for Bands
      { name: 'Band Squats', description: 'A lower-body exercise using resistance bands to strengthen the legs and glutes.', goal: 'Gain_Strength', level: 'Beginner', equipment: 'Bands', duration: 20, muscleGroup: 'Legs', instructions: 'Stand on the band with feet shoulder-width apart and squat down, keeping tension on the band.', METscore: 4.2 }, 
      { name: 'Band Pull-Aparts', description: 'A shoulder exercise using resistance bands to target the upper back and shoulders.', goal: 'Gain_Strength', level: 'Beginner', equipment: 'Bands', duration: 15, muscleGroup: 'UpperBody', instructions: 'Hold the band with both hands and pull it apart, focusing on squeezing your shoulder blades.', METscore: 3.6 }, 
      { name: 'Band Chest Press', description: 'Targets the chest and triceps using resistance bands.', goal: 'Gain_Strength', level: 'Intermediate', equipment: 'Bands', duration: 20, muscleGroup: 'UpperBody', instructions: 'Anchor the band behind you and press the handles forward, squeezing your chest at the end of the movement.', METscore: 4.3 }
      
      // Additional Workouts for Other Equipment...
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Workouts', null, {});
  }
};
