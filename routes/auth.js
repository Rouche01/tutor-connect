const router = require('express').Router();
const { register, login, createAdmin } = require('../controllers/auth');


// Creating the root admin
createAdmin();

// Students registration route
router.post('/student/register', async (req, res) => {
    await register(req, res, "student");
});

// Tutor registration route
router.post('/tutor/register', async(req, res) => {
    await register(req, res, "tutor");
});


// Students login route
router.post('/student/login', async(req, res) => {
    await login(req, res, "student");
});

// Tutors login route
router.post('/tutor/login', async(req, res) => {
    await login(req, res, "tutor");
});

// Admin login route
router.post('/admin/login', async(req, res) => {
    await login(req, res, "admin");
});



module.exports = router;