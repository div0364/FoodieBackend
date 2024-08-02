const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URL;

const mongoDB = async () => {
    
    try {
    
        await mongoose.connect(mongoURI, {
            connectTimeoutMS: 10000,  // Set a connection timeout
            serverSelectionTimeoutMS: 10000  // Server selection timeout
        });
        
        console.log("DB connected successfully");

        // Fetch food items and food category data
        const fetchedData = await mongoose.connection.db.collection("food_items").find({}).toArray();
        const foodCategoryData = await mongoose.connection.db.collection('food_category').find({}).toArray();

        // Assign the fetched data to global variables
        global.food_items = fetchedData;
        global.foodCategory = foodCategoryData;

        // Optionally log the fetched data
        // console.log("Fetched food items:", global.food_items);
        // console.log("Fetched food categories:", global.foodCategory);

    } catch (err) {
        
        console.error("DB CONNECTION ISSUES", err.message);
        process.exit(1);
    }
};

module.exports = mongoDB;
