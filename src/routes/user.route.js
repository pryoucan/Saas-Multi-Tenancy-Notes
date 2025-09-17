import { userLogin } from "../controllers/user.controller.js";
import { Router } from "express";
import { isAdminRoleChecker, protect } from "../middleware/auth.middleware.js";
import inviteUsers from "../controllers/userInvitation.controller.js";

const router = Router();

router.route('/login').post(userLogin);
router.post('/invite', protect, isAdminRoleChecker, inviteUsers);

export default router