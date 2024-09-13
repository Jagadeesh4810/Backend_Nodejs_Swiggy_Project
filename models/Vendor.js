const mongoose = require('mongoose');
const vendorSchema = new mongoose.Schema({
    username:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    firm:[{
        type:mongoose.Schema.Types.ObjectId,                                                                                        //Here i'm addding(firm to the vendor) building relation b/w two models
        ref: 'Firm'                                                                                                                 //in this ref : we given 'Firm' table. so we related firm table to the vendor table
    }]


});
 const Vendor = mongoose.model('Vendor',vendorSchema)                                                                               //here Vendor is the model name (Vendor.js.. this one)
 module.exports = Vendor;