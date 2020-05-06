const router = require('express').Router();
const { getSubjects, addSubject, getSubject } = require('../controllers/subject');

// Getting all subjects associated with a category
router.get('/category/:name/subject', getSubjects);

// Adding subjects into a new category in a new database
router.post('/category/:name/subject', addSubject);

// Retreiving a subject by their id
router.get('/category/:name/subject/:id', getSubject);

module.exports = router;