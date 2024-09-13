const mongoose = require('mongoose');
const firmSchema = new mongoose.Schema({
    firmName:{
        type: String,
        required:true,
        unique: true
    },
    area:{
        type:String,
        required:true,
    },
    category:{
        type:[
            {
                type:String,
                enum:['veg','non-veg']
            }
        ]
    },
    region:{
        type:[
            {
                type:String,                                                                                                        //enum: means multiple values
                enum:['south-indian','north-indian','chinese','bakery']                                                         //Using an array of enums(for multiple values from the enum set)
            }
        ]
    },
    offer:{
        type:String
    },
    image:{
        type:String
    },
    vendor:[{
        type:mongoose.Schema.Types.ObjectId,                                                                                    //Here i'm adding vendor to the firm) building relation b/w two models
        ref: 'vendor'                                                                                                               //in this ref : we given 'vendor' table. so we related vendor table to the firm table  
    }],
    products:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }
    ]

});
 const Firm = mongoose.model('Firm',firmSchema)
 module.exports = Firm;