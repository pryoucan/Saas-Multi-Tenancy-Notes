import { Router } from 'express';
import { protect, isAdminRoleChecker } from '../middleware/auth.middleware.js';
import subscriptionPlanUpgrade from '../controllers/subsPlanUpgrader.controller.js';

const router = Router();

router.post('/:slug/upgrade', protect, isAdminRoleChecker, subscriptionPlanUpgrade);

export default router;