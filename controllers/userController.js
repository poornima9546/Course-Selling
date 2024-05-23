// controllers/userController.js
import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import { generateToken } from '../utils/generateToken.js'; // Ensure correct path and .js extension

export const signup = async (req, res) => {
    console.log("hitted");
    try {
        console.log(req.body);
        const { firstName, lastName, password, email } = req.body;
        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).send("User already exists");
        }

        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds);

        // Log the hashed password to the console
        console.log("Hashed password:", hashPassword);

        const newUser = new User({
            email,
            firstName,
            lastName,
            hashPassword,
        });

        const newUserCreated = await newUser.save();

        console.log(newUserCreated);
        if (!newUserCreated) {
            return res.status(500).send("User not created");
        }

        const token = generateToken(email);
        res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        res.send("Signed up successfully");
    } catch (error) {
        console.log(error, "Something went wrong");
        res.status(500).send("Internal Server Error");
    }
};

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        console.log(user);

        if (!user) {
            return res.status(400).send("User not found");
        }

        const matchPassword = await bcrypt.compare(password, user.hashPassword);

        if (!matchPassword) {
            return res.status(400).send("Password is not correct");
        }

        const token = generateToken(email);
        res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        res.send("Logged in!");
    } catch (error) {
        console.log(error, "Something went wrong");
        res.status(500).send("Internal Server Error");
    }
};
