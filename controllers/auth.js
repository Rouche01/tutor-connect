const User = require('../models/User');
const bcrypt = require('bcryptjs');
const Joi = require('@hapi/joi');

const requestValidation = async (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        username: Joi.string().min(4).required(),
        name: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    });

    return await schema.validateAsync(data);
}

exports.register = async (req, res, role) => {
    const { email, username, name, password } = req.body;

    try {
        // Validating data received from request
        await requestValidation(req.body);

        // Checking if email already exists in the database
        const emailExist = await User.findOne({ email });
        if(emailExist) return res.status(400).json({
            status: false,
            message: "Email is already registered"
        });

        // Checking if username already exists in the database
        const usernameExist = await User.findOne({ username });
        if(usernameExist) return res.status(400).json({
            status: false,
            message: "Username is already taken"
        });

        // Encrypting password for security
        const encryptedPassword = await bcrypt.hash(password, 12);

        //Creating new user
        const user = new User({
            email,
            username,
            name,
            password: encryptedPassword,
            role
        });

        try {
            await user.save();
            res.status(200).json({
                status: true,
                message: "User registered successfully, you can now login"
            })
    
        } catch(err) {
            res.status(500).json({
                status: false,
                message: "Unable to create your account, you can try again"
            });
        }

    } catch(err) {
        res.send(err.details[0].message);
    }


    
    
}

