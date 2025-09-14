import { userLogin } from "../controllers/user.controller.js";
import { Router } from "express";

const router = Router();

router.route('/login').post(userLogin);

export default router