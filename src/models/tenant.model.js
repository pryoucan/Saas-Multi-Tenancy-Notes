import mongoose, { Schema } from "mongoose";

const tenantModelSchema = Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        subscriptionPlan: {
            type: String,
            required: true,
            enum: ['Free', 'Pro'],
            default: 'Free'            
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        }
    },
    {
        timestamps: true
    }
);

export const Tenant = mongoose.model('Tenant', tenantModelSchema);

