import bcrypt from"bcrypt";
import User from "../models/userModel";
import { generateToken } from "../utils/generateToken";

export const signup = async (req, res) => {
    console.log("hitted");
    try {
        console.log(req.body);
        const { firstName, lastName, password, email } = req.body;
        const userExist = await User.findOne({ email });
        
        if (userExist) {
            return res.send("User already exists");
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

        const newUserCreated =  await newUser.save();

        console.log(newUserCreated);
        if (!newUser) {
            return res.send("User not created");
        }
    
        const token = generateToken(email);
        res.cookie("token", token)
        res.send("Signed successfully");
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
            return res.send("User not found");
        }
  
        const matchPassword = await bcrypt.compare(password, user.hashPassword);
  
        if (!matchPassword) {
            return res.send("Password is not correct");
        }
  
        const token = generateToken(email);
        res.cookie("token", token);
        res.send("Logged in!");
    } catch (error) {
        console.log(error, "Something wrong");
        res.status(500).send("Internal Server Error");
    }
};

