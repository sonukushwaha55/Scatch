const mongoose = require("mongoose");

// Create a function to handle the database connection
const connectDB = async () => {
    try {
        // Attempt to connect to MongoDB using the provided URI and database name
        await mongoose.connect(`${process.env.MONGODB_URI}/scatch`);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("MongoDB connection error: ", error);
        process.exit(1); // Exit the process with a failure code
    }
};


module.exports = connectDB;
