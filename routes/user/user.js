import express from "express"
const UserRouter = express.Router();
import { signup, signin } from  "../controllers/userController";

userRouter.get("/", (req, res) => {
    res.send("user route");
})
userRouter.post("/signup", signup);

userRouter.post("/signin", signin);

export default userRouter;