const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        console.log(process.env.MONGODB_URL);
        await mongoose.connect(process.env.MONGODB_URL);

        console.log("MongoDB Connected");
    } catch (err) {
        console.log(err);

        process.exit(1);
    }
};

module.exports = connectDB;