const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName:{
        type:String,
        require:true
    },
    price:{
        type:String,
        require:true
    },
    category:{
        type:[
            {
                type:String,
                enum:["veg","non-veg"]
            }
        ]   
    },
    image:{
        type:String
    },
    bestSeller:{
        type:String
    },
    description:{
        type:String
    },
    firm:[{
        type:mongoose.Schema.Types.ObjectId,                                                                                    //Here i'm addding(firm to the product) building relation b/w two models
        ref:'Firm'                                                                                                                  //in this ref : we given 'Firm' table. so we related firm table to the product table
    }]

})

const Product = mongoose.model('Product',productSchema)
module.exports = Product;