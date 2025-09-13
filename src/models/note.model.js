import mongoose, { Schema } from "mongoose"

const noteModelSchema = Schema(
    {
        noteTitle: {
            type: String,
            required: true,
            trim: true
        },
        noteContent: {
            type: String,
            trim: true,
        },
        tenantId: {
            type: Schema.Types.ObjectId,
            ref: 'Tenant',
            required: true,
            index: true
        },
        authorId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const Note = mongoose.model('Note', noteModelSchema);