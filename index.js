//creating  server
const express = require("express");
const mongoose = require('mongoose');
const dotEnv = require('dotenv');
const bodyParser = require('body-parser');
const app = express();
const vendorRoutes = require('./routes/vendorRoutes')
const firmRoutes = require('./routes/firmRoutes')
const productRoutes = require('./routes/productRoutes')
const cors = require('cors')                                                                                                                            //cors: It allows resources (like images,scripts(javascript),data(API requests),Fonts,stylesheets(CSS) etc.)to be shared b/w different websites
const path = require('path')                                                                                                                            // This path is inbuilt in nodejs (..we required these for image purpose)
const PORT = process.env.PORT || 4000;
dotEnv.config();
app.use(cors())
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected...")).catch((err)=>console.log(err)) // using try and catch block for error handling

                                                                                                                                                    //By using these method we can covert the input values into the Json.
app.use(bodyParser.json());
app.use('/vendor',vendorRoutes);                                                                                                                    //for vendor i gave '/vendor'path ..This vendor path have(endpoint key /register & /login)
app.use('/firm',firmRoutes);                                                                                                                        //for firm i gave '/firm' path.. This firm path have(endpoint key../add-firm)
app.use('/product',productRoutes)
app.use('/uploads',express.static('uploads'));                                                                                                      //for imageroute we created middleware
app.listen(PORT, ()=>{
    console.log("Server is Running...")
})
app.use("/",(req,res)=>
{
    res.send("<h1>Welcome to Swiggy</h1>")
})























//we have to create a http request...so we have to use middleware....{app.use()}




//app.use() is a middelware..i imported vendorRoutes,firmRoutes,..for this routes i created middleware and i gave a path ex:'/vendor', '/firm'...now it acts like a http request

