import { Tenant } from "../models/tenant.model.js";

const subscriptionPlanUpgrade = async (req, res) => {

    try {
        const {slug} = req.params;
        const tenant = await Tenant.findOne({slug: slug});

        if(!tenant) {
            return res.status(404).json({message: "Tenant not found"});
        }

        if(tenant._id.toString() !== req.user.tenantId.toString()) {
            return res.status(403).json({message: "You can not upgrade another tenant's plan"});
        }

        tenant.subscriptionPlan = "Pro"
        const updatedPlan = await tenant.save();

        return res.status(200).json(updatedPlan)
    }
    catch(error) {
        return res.status(500).json({message: "Failed to upgrade subscription"});
    }
};

export default subscriptionPlanUpgrade;







