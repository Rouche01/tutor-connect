const router = require('express').Router();
const { bookLesson, getLessons, getLesson, updateLesson, deleteLesson} = require('../controllers/lesson');
const { isAuth, checkRole } = require('../middlewares/auth');

// setting for student to book lessons
router.post('/lesson', isAuth, checkRole('student'), bookLesson);

// retrieving all lessons
router.get('/lesson', isAuth, checkRole('admin'), getLessons);

// retrieve a lesson by its id
router.get('/lesson/:lesson_id', isAuth, checkRole('admin'), getLesson);

// Update a lesson by its id
router.patch('/lesson/:lesson_id', isAuth, checkRole('admin'), updateLesson);

// Delete a lesson by its id
router.delete('/lesson/:lesson_id', isAuth, checkRole('admin'), deleteLesson);



module.exports = router;