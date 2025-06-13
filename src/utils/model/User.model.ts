import mongoose from "mongoose";

const sceneSchema = new mongoose.Schema({
    sceneNumber: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    imagePrompt: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
}, { _id: false }); 

const promptSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    scenes: {
        type: [sceneSchema],
        required: true
    }
}, { _id: false });

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    promps: {
        type: [promptSchema],
        default: []
    }
}, { timestamps: true });

const Users = mongoose.models.Users || mongoose.model('Users', userSchema);
export default Users;
