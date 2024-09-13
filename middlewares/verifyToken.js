const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const dotEnv = require('dotenv');

dotEnv.config()
const secretKey = process.env.WhatIsYourName

const verifyToken = async(req,res,next)=>
{
    const token = req.headers.token;                                                                                                //here we r passing token to the headers
    if(!token)
    {
       return res.status(401).json({error:"Token is required"});
    }
    try{
        const decoded = jwt.verify(token,secretKey)                                                                                 //decoded the token ...Ex: rf5bfbtokenrb45 decoded to id
                                                                                                                                    /*In this decoded variable we have payload..look like 
                                                                                                                                    vendorId:{
                                                                                                                                    _id:123gyggxxbj
                                                                                                                                    } */
       const vendor = await Vendor.findById(decoded.vendorId);                                                                  //checking the decoded token id to the database id..if it is there or matches entire data present in the id will store in the vendor variable.
        if(!vendor)
        {
            return res.status(404).json({error:"vendor not found"})
        }
        req.vendorId = vendor._id
        next()
    }
    catch(err)
    {
        console.log(err)
        return res.status(500).json({err:"Invalid Token"});
    }
}
module.exports = verifyToken;





















/*The next() function will allows to do the further actions, once current actions get completed.
req.vendorId , here we are attaching "req" to the vendorId. so it is accessible across multiple middleware or routes.
we can use decoded.vendorId also but it is a local variabhle only accessible within the scope.*/