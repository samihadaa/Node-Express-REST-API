const jwt = require('jsonwebtoken');
const { authSchema } = require('../middlewares/validator');
const { doHash, doHashComparison } = require('../utils/hashing')
const User = require('../models/userModel');

// Signup function 
const signup = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { error, value } = authSchema.validate({ email, password });
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(401).json({ success: false, message: "user already exists" });
        }
        const hashedPassword = await doHash(password, 12);
        const newUser = await User.create({
            email,
            password: hashedPassword
        });
        newUser.password = undefined
        res.status(201).json({ success: true, message: "used created successfully", user: newUser });
    } catch (error) {
        console.log(error);
    }
}

const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { error, value } = authSchema.validate({ email, password });
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }
        const existingUser = await User.findOne({ email }).select('+password');

        if (!existingUser) {
            res.status(401).json({ success: false, message: "user not found" });
        }

        const isEqualPassword = await doHashComparison(password, existingUser.password);

        if (!isEqualPassword) {
            res.status(401).json({ success: false, message: "Bad credentials!" })
        }
        const token = jwt.sign({
            userId: existingUser._id,
            email: existingUser.email,
            verified: existingUser.verified
        }, process.env.TOKEN_SRECRET_KEY);

        res.cookie('Authorisation', 'Bearer' + token, { expires: new Date(Date.now() + 8 * 3600000), secure: process.env.NODE_ENV === 'production', httpOnly: process.env.NODE_ENV === 'production' }).json({
            success: true,
            message: "logged in successfully!!",
            token: token,
        });

    } catch (error) {
        console.log(error)
    }
}
const signout = async (req, res)=>{
res.clearCookie('Authorisation').status(200).json({success})
}

module.exports = { signup, signin,signout }