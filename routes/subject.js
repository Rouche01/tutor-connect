const router = require('express').Router();
const { getSubjects, addSubject, getSubject, getSubjectTutors,
    updateSubject, deleteSubject, querySubject } = require('../controllers/subject');
const { isAuth, checkRole } = require('../middlewares/auth');

// Getting all subjects associated with a category
router.get('/category/:category_name/subjects', isAuth, getSubjects);

// Retreiving a subject by their id
router.get('/category/:category_name/subject/:subject_id', isAuth, getSubject);

// Adding subjects into a new category in a new database
router.post('/category/:category_name/subject', isAuth, checkRole('admin'), addSubject);

// Updating a subject in a category
router.patch('/category/:category_name/subject/:subject_id', isAuth, checkRole('admin'), updateSubject);

// Deleting a subject in a category
router.delete('/category/:category_name/subject/:subject_id', isAuth, checkRole('admin'), deleteSubject);

//Retrieving all tutors taking a subject
router.get('/category/:category_name/:subject_id/tutors', isAuth, checkRole('student'), getSubjectTutors);

// Query route for subjects
router.get('/subjects', isAuth, querySubject);


module.exports = router;