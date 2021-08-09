const express=require('express');
const path = require("path");
const dotenv = require("dotenv")
const fileupload = require("express-fileupload");
const cors=require("cors")


dotenv.config({
    path: "./database/config.env",
});
// Connect to mongoDB database
const connectDB=require('./database/db')

// Load routes files
const customerInfoRoute=require('./routes/customerInfoRoute');
const adminRoute=require('./routes/adminRoute');


const app=express();



//Body parser , which allows to receive body data from postman
app.use(cors({origin: "http://localhost:3000",
credentials: true}))
app.use(express.json());
app.use(express.urlencoded({limit: '50mb',urlencoded:true}))

//File upload
app.use(fileupload());
// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Mount routes
app.use(customerInfoRoute)
app.use(adminRoute)



app.listen(90)

