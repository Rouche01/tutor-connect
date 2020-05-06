const router = require('express').Router();
const { register, login, createAdmin, getTutors, getTutor, deleteTutor } = require('../controllers/auth');
const { isAuth, checkRole } = require('../middlewares/auth');


// Creating the root admin
createAdmin();

// Students registration route
router.post('/register-student', async (req, res) => {
    await register(req, res, "student");
});

// Tutor registration route
router.post('/register-tutor', async(req, res) => {
    await register(req, res, "tutor");
});


// Students login route
router.post('/login-student', async(req, res) => {
    await login(req, res, "student");
});

// Tutors login route
router.post('/login-tutor', async(req, res) => {
    await login(req, res, "tutor");
});

// Admin login route
router.post('/login-admin', async(req, res) => {
    await login(req, res, "admin");
});

// Retrieving all tutors by admin
router.get('/tutor', isAuth, checkRole('admin'), getTutors);

// Retrieving a tutor by id
router.get('/tutor/:id', isAuth, checkRole('admin'), getTutor);

// Deactivating a tutor
router.delete('/tutor/:id', isAuth, checkRole('admin'), deleteTutor);



module.exports = router;