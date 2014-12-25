import mongoose from "mongoose";

const connectDB = async (URI) => {
    try {
        const DB_options = {
            dbName: "meraStore"
        }
        await mongoose.connect(URI, DB_options)
        console.log("Database Connected Successfully.")
    } catch (error) {
        console.error("Error connecting to the database:", error.message)
    }
}

export default connectDB;



