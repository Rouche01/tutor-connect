const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

exports.isAuth = async (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) return res.status(401).json({
        status: false,
        message: "Access Denied"
    });
    const tokenData = jwt.verify(token, process.env.SECRET_KEY);

    try {
        const user = await User.findById({_id: tokenData._id});
        if(!user) return res.status(401).json({
            status: false,
            message: "User does not exist"
        });
        req.currentUser = user;
        next();
    } catch(err) {
        res.status(400).json({
            status: false,
            message: "Invalid token"
        })
    }
};


exports.checkRole = (requiredRole) => {
    return (req, res, next) => {
        if(req.currentUser.role !== requiredRole) return res.status(401).json({
            status: false,
            message: "Access denied, you do not have the required role to access this resource"
        })
        return next();
    }
};

exports.checkAdmin = () => {
    return (req, res, next) => {
        if(!req.currentUser.isAdmin) return res.status(401).json({
            status: false,
            message: "Access denied, you do not have the required role to access this resource"
        })
        return next();
    }
};

