import bcrypt from "bcrypt";
import instructor from "../models/instructorModel.js";
import { adminToken } from "../utils/generateToken.js";

// Signup function
export const signup = async (req, res) => {
    try {
      const { email, password, firstName, lastName } = req.body;
      const hashPassword = await bcrypt.hash(password, 10);
  
      const newInstructor = new Instructor({
        email,
        hashPassword,
        firstName,
        lastName,
      });
  
      await newInstructor.save();
  
      const token = generateToken(email);
      res.status(201).json({ message: 'Instructor created successfully', token });
    } catch (error) {
      console.error('Error during signup:', error);
      res.status(500).json({ message: 'Something went wrong', error });
    }
  };
  
  // Signin function
  export const signin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const instructor = await Instructor.findOne({ email });
  
      if (!instructor) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
  
      const isMatch = await bcrypt.compare(password, instructor.hashPassword);
  
      if (!isMatch) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
  
      const token = generateToken(email);
      res.status(200).json({ message: 'Signin successful', token });
    } catch (error) {
      console.error('Error during signin:', error);
      res.status(500).json({ message: 'Something went wrong', error });
    }
  };
  
  // Get all instructors function
  export const getAllInstructors = async (req, res) => {
    try {
      const instructors = await Instructor.find();
      res.status(200).json(instructors);
    } catch (error) {
      console.error('Error getting instructors:', error);
      res.status(500).json({ message: 'Something went wrong', error });
    }
  };