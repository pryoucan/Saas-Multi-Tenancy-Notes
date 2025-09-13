import mongoose from "mongoose";
import dotenv from 'dotenv';
import {Tenant} from "./models/tenant.model.js";
import {User} from "./models/user.model.js";
import { Note } from "./models/note.model.js";

dotenv.config();

const seedDatabase = async () => {
    try {
        const status = await mongoose.connect(process.env.MONGODB_URI);
        console.log('Database is connnected successfully, Seeding.....');

        await Tenant.deleteMany({});
        await User.deleteMany({});

        const acmeTenant = await Tenant.create({
            name: 'Acme',
            slug: 'acme',
            subscriptionPlan: 'Free'
        });

        const globexTenant = await Tenant.create({
            name: 'Globex',
            slug: 'globex',
            subscriptionPlan: 'Free'
        });

        console.log("Tenants Created");

        await User.create([
            {
                email: 'admin@acme.test',
                password: 'password',
                role: 'Admin',
                tenantId: acmeTenant._id
            },
            {
                email: 'user@acme.test',
                password: 'password',
                role: 'Member',
                tenantId: acmeTenant._id
            },
            {
                email: 'admin@globex.test',
                password: 'password',
                role: 'Admin',
                tenantId: globexTenant._id
            },
            {
                email: 'user@globex.test',
                password: 'password',
                role: 'Member',
                tenantId: globexTenant._id
            }
        ]);

        console.log('Users created and linked to Tenants');

        console.log('Database seeded successfully');

        await mongoose.disconnect();
    }
    catch(error) {
        console.log('Error in seeding the database', error);
    }
};

seedDatabase();

export default seedDatabase;