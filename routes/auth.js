const router = require('express').Router();
const User = require('../models/User');

router.post('/', (req, res) => {
    const { email, username, name, password, role } = req.body;
    const user = new User({
        email,
        username,
        name,
        password,
        role
    })
    res.send({
        success: true,
        message: "User registered successfully"
    })
});

module.exports = router;