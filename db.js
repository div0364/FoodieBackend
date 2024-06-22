const mongoose = require('mongoose');
require('dotenv').config();
const mongoURI = process.env.MONGO_URL;

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, { useUnifiedTopology: true });
        console.log("DB connected successfully");

        const fetchedData = await mongoose.connection.db.collection("food_items").find({}).toArray();
        const foodCategoryData = await mongoose.connection.db.collection('food_category').find({}).toArray();

        global.food_items = fetchedData;
        global.foodCategory = foodCategoryData;

        // console.log("Fetched food items:", global.food_items);
        // console.log("Fetched food categories:", global.foodCategory);

    } catch (err) {
        console.error("DB CONNECTION ISSUES", err);
        process.exit(1);
    }
};

module.exports = mongoDB;
