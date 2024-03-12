import { Router } from "express";
import userRoute from "./user.js";

const router = Router();

router.use('/users', userRoute)


export default router;