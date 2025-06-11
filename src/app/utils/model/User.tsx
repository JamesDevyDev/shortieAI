import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    clerkId: {
        type: String,
        required: true
    }
}, { timestamps: true })

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User