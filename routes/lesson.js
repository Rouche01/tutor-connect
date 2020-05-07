const router = require('express').Router();
const { bookLesson, getLessons, getLesson, updateLesson, deleteLesson} = require('../controllers/lesson');

// setting for student to book lessons
router.post('/:username/lesson', bookLesson);

// retrieving all lessons
router.get('/lesson', getLessons);

// retrieve a lesson by its id
router.get('/lesson/:lesson_id', getLesson);

// Update a lesson by its id
router.patch('/lesson/:lesson_id', updateLesson);

// Delete a lesson by its id
router.delete('/lesson/:lesson_id', deleteLesson);



module.exports = router;