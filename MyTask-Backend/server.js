const express=require("express");
const errorHandler = require("./middleware/errorHandler.js");
const connectDb = require("./Config/dbConnection.js");
const dotenv =require("dotenv").config();

const cors = require('cors');


// Configure CORS
const corsOptions = {
    origin: '*', // Allow all origins (change to a specific origin as needed)
    methods: 'GET, POST, PUT, DELETE, PATCH', // Specify allowed methods
    allowedHeaders: 'Content-Type, Authorization', // Specify allowed headers
};

connectDb();

const app=express();

// Use the `cors` middleware
app.use(cors(corsOptions));

const port= process.env.PORT || 5000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
 app.use("/api/user",require("./routes/userRoutes.js"))
 app.use("/api/task",require("./routes/taskRoutes.js"))
app.use(errorHandler);
app.listen(port,()=>{
    console.log(`Server is listening to port ${port}`)
});