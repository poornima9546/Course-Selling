
import userRouter from "./user/userRouter.js";
userRouter.use("/user", userRouter);

export default userRouter;