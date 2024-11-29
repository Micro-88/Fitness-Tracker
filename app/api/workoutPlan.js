const express = require('express');
const router = express.Router();
const workoutPlanController = require('../controllers/workoutPlanController');

// POST request to assign a workout
router.post('/assign', workoutPlanController.assignWorkout);

module.exports = router;
