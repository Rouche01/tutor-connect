const router = require('express').Router();
const { getSubjects, addSubject, getSubject, updateSubject, deleteSubject } = require('../controllers/subject');
const { isAuth, checkRole } = require('../middlewares/auth');

// Getting all subjects associated with a category
router.get('/category/:name/subject', isAuth, getSubjects);

// Retreiving a subject by their id
router.get('/category/:name/subject/:id', isAuth, getSubject);

// Adding subjects into a new category in a new database
router.post('/category/:name/subject', isAuth, checkRole('admin'), addSubject);

// Updating a subject in a category
router.patch('/category/:name/subject/:id', isAuth, checkRole('admin'), updateSubject);

// Deleting a subject in a category
router.delete('/category/:name/subject/:id', isAuth, checkRole('admin'), deleteSubject);



module.exports = router;