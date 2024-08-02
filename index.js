const express = require("express");
const app = express();

require("dotenv").config();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://food-frontend-kevs7k44e-div0364s-projects.vercel.app/");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    next();
});

app.use(express.json());
const port=process.env.PORT;
const mongoDB = require("./db");
mongoDB();

app.use('/api/v1', require("./Routes/CreateUser"));
app.use('/api/v1', require("./Routes/DisplayData"));
app.use('/api/v1', require("./Routes/OrderData"));

app.get('/', (req, res) => {
    res.send('hello world');
});
app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
    });

module.exports = app; // Export app for Vercel serverless functions
