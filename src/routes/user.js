import { Router } from "express";
import {createUser, getBirthdays} from "../controller/user.js"

const router = Router();

router.post('/', createUser)
router.get( '/birthdays', getBirthdays);

export default router;