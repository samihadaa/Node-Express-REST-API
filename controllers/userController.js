const { signupSchema } = require('../middlewares/validator');
const {doHash} = require('../utils/hashing')
const User = require('../models/userModel');

// Signup function 
const signup = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { error, value } = signupSchema.validate({ email, password });
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }
        const isExistingUser = await User.findOne({ email });
        if (isExistingUser) {
            res.status(401).json({ success: false, message: "user already exists" });
        }
        const hashedPassword = await doHash(password, 12);
        const newUser = await User.create({
            email,
            password: hashedPassword
        });
        newUser.password = undefined
        res.status(201).json({success: true, message: "used created successfully", user: newUser});
    } catch (error) {
        console.log(error);
    }
}

const signin = async (req, res)=> {

}

module.exports = { signup, signin }