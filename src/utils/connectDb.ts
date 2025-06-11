import mongoose from "mongoose"

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.NEXT_MONGODB_URL!)
        console.log('connected to DATABASE')
    } catch (error) {
        console.log(error)
    }
}

export default connectDb