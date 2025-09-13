import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const userModelSchema = new Schema(
    {
        tenantId: {
            type: Schema.Types.ObjectId,
            ref: 'Tenant',
            required: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
            enum: ['Admin', 'Member']
        },
    },
    {
        timestamps: true
    }
);

userModelSchema.pre('save', 
    async function(next) {
    if(!this.isModified('password')) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 10)
    next();
});

userModelSchema.methods.matchPassword = (async function(password) {
    return await bcrypt.compare(password, this.password);
})


export const User = mongoose.model('User', userModelSchema);