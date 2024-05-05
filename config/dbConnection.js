const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
    try {
        let connectionString = process.env.CONNECT_DB; // Default connection string
        
        if (process.env.DOCKER) {
            connectionString = process.env.MONGODB_URI;
        }
        
        const conn = await mongoose.connect(connectionString);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;