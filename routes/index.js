
import userRouter from "./user/user";
userRouter.use("/user", userRouter);

export default userRouter;