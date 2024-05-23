import express from "express";
const userRouter = express.Router();  // Use consistent naming

import { signup, signin } from "../../controllers/userController.js";  // Ensure the correct path and .js extension

userRouter.get("/", (req, res) => {
    res.send("user route");
});

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);

export default userRouter;
