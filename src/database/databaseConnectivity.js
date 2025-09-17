import mongoose from "mongoose";

const dbConnectivity = async () => {
    try {
        const status = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Database connection host: ${status.connection.host}`);
    }
    catch(error) {
        console.log(`Database connection failed: ${error}`);
        throw error;
    }
}

export default dbConnectivity;