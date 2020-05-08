const User = require('../models/User');
const bcrypt = require('bcryptjs');
const Joi = require('@hapi/joi');
require('dotenv').config();

const registerValidation = async (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        username: Joi.string().min(4).required(),
        name: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    });

    return await schema.validateAsync(data);
}

const loginValidation = async(data) => {
    const schema = Joi.object({
        username: Joi.string().min(4).required(),
        password: Joi.string().required()
    })

    return await schema.validateAsync(data);
}

exports.register = async (req, res, role) => {
    const { email, username, name, password } = req.body;

    try {
        // Validating data received from request
        await registerValidation(req.body);

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


exports.login = async(req, res, role) => {
    const { username, password } = req.body;

    try {
        // validate data gotten from request
        await loginValidation(req.body);

        // check if the user exists in our database
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({
            status: false,
            message: "You are logging in with an invalid credentials. Check and try again"
        });
        
        // checking the role
        if(user.role !== role) return res.status(403).json({
            status: false,
            message: "You are logging in from the wrong portal, you do not have access to this role"
        });

        // validating password
        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) return res.status(403).json({
            status: false,
            message: "You are logging in with an invalid credentials. Check and try again"
        })

        // create token and assign it to the user
        const result =  {
            username: user.username,
            role: user.role,
            email: user.email,
            token: user.generateToken()
        }
        res.status(200).header('auth-token', result.token).send(result);

    } catch(err) {
        res.send(err.details[0].message);
    }
}


exports.createAdmin = async () => {
    const hashedPassword = await bcrypt.hash(process.env.ROOT_ADMIN_PASSWORD, 12);
    const checkAdmin = await User.findOne({username: "john.doe"});
    if (!checkAdmin) {
        await User.create({
            username: "john.doe",
            name: "John Doe",
            role: "admin",
            email: "johndoe@yahoo.com",
            password: hashedPassword
        });
    }
}

