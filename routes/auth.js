const router = require('express').Router();
const { register } = require('../controllers/auth');


// Students registration route
router.post('/register-student', async (req, res) => {
    await register(req, res, "student");
});

//Tutor registration route
router.post('/register-tutor', async(req, res) => {
    await register(req, res, "tutor");
})

module.exports = router;