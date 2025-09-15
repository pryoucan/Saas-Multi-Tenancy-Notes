import { Router } from "express";
import {protect, isAdminRoleChecker} from "../middleware/auth.middleware.js";
import subscriptionPlanCheck from "../middleware/subscription.middleware.js";

import 
{   createNote, 
    getNotes, 
    getNoteById, 
    updateNote, 
    deleteNote 
} from "../controllers/note.controller.js";

const router = Router();

router.use(protect);

router.route('/').get(getNotes)

router.route('/').post(subscriptionPlanCheck, createNote)

router.route('/:id').get(getNoteById)
.put(updateNote)
.delete(deleteNote)

export default router;