import mongoose, { mongo } from 'mongoose'

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.NEXT_MONGODB_URL!)
    } catch (error) {
        console.log(error)
    }
}