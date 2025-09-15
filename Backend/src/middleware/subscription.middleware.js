import { Tenant } from "../models/tenant.model.js";
import { Note } from "../models/note.model.js";
const subscriptionPlanCheck = async(req, res, next) => {

    const { tenantId } = req.user;

    const membersTenantId = await Tenant.findById(tenantId);

    if(!membersTenantId || membersTenantId.subscriptionPlan === "Pro") {
        return next();
    }

    const memberNotesCount = await Note.countDocuments({ tenantId: tenantId })

    if(memberNotesCount >= 3) {
        return res.status(403).json({ message: "Please upgrade to Pro" });
    }

    next();
};

export default subscriptionPlanCheck;