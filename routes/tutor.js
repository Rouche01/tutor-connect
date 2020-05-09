const router = require('express').Router();
const { getTutors, 
    getTutor, 
    deleteTutor, 
    registerSubject, 
    getTutorSubjects, 
    updateTutorSubject,
    deleteTutorSubject,
    queryTutor } = require('../controllers/tutor');
const { isAuth, checkRole } = require('../middlewares/auth.js');

// Retrieving all tutors by admin
router.get('/tutors', isAuth, checkRole('admin'), getTutors);

// Query route for subjects
router.get('/tutor', isAuth, queryTutor);

// Retrieving a tutor by id
router.get('/tutor/:tutor_id', isAuth, checkRole('admin'), getTutor);

// Deactivating a tutor
router.delete('/tutor/:tutor_id', isAuth, checkRole('admin'), deleteTutor);

// registering to take a subject
router.post('/tutor/register-subject', isAuth, checkRole('tutor'), registerSubject);

// retreiving a tutors registered subjects
router.get('/tutor/registered/subjects', isAuth, checkRole('tutor'), getTutorSubjects);

// updating registered subject
router.patch('/tutor/subject/:subject_id', isAuth, checkRole('tutor'), updateTutorSubject);

// deleting registered subjects
router.delete('/tutor/subject/:subject_id', isAuth, checkRole('tutor'), deleteTutorSubject);

module.exports = router;