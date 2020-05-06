const router = require('express').Router();
const { getSubjects, addSubject, getSubject } = require('../controllers/subject');
const { isAuth, checkRole } = require('../middlewares/auth');

// Getting all subjects associated with a category
router.get('/category/:name/subject', isAuth, getSubjects);

// Adding subjects into a new category in a new database
router.post('/category/:name/subject', isAuth, checkRole('admin'), addSubject);

// Retreiving a subject by their id
router.get('/category/:name/subject/:id', isAuth, getSubject);

module.exports = router;