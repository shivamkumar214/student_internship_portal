import mongoose from "mongoose"

const connectDB=async ()=> {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: "student-Internship-portal",
        })
        console.log("DB connected")
    } catch (error) {
        console.log(error)
    }
}      

export default connectDB