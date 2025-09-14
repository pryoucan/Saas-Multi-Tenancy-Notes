import { Router } from "express";
import protect from "../middleware/auth.middleware.js";
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

router.route('/').get(getNotes).post(subscriptionPlanCheck, createNote)

export default router;