import mongoose from "mongoose";

const dbConnectivity = async () => {
    try {
        const status = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Status success ${status.connection.host}`);
    }
    catch(error) {
        console.log(`Status failed ${error}`);
        throw error;
    }
}

export default dbConnectivity;