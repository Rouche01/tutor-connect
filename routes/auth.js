const router = require('express').Router();
const { register, login, createAdmin } = require('../controllers/auth');


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



module.exports = router;