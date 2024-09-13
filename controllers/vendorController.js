const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const dotEnv = require('dotenv');

dotEnv.config();
const secretKey =process.env.WhatIsYourName


const vendorRegister = async(req,res)=>
    {
        const{username,email,password} = req.body;
        try{
            const vendorEmail=await Vendor.findOne({email});         //try&catch block for error handling
            if(vendorEmail)
            {
                return res.status(400).json("Email already taken");
            }
            const hashedPassword = await  bcrypt.hash(password, 10);
            const newVendor = new Vendor({
                username,
                email,
                password: hashedPassword
            });
            await newVendor.save();
            res.status(201).json("Vendor Registered successfully");
            console.log('Registered');

        }
        catch(err)
        {
            console.log(err);
            res.status(500).json("Internal server error");
        }
        
    } 

    const vendorLogin = async(req,res)=>
        {
            const {email,password} = req.body;
            try{
                const vendor = await Vendor.findOne({email})
                if(!vendor||!(await bcrypt.compare(password,vendor.password)))
                {
                    res.status(401).json("Invalid username or password");
                }
                const token = jwt.sign({vendorId: vendor._id},secretKey,{expiresIn:"1h"})
                res.status(200).json({success:"Login successful",token});
                console.log(token);
            }
            catch(err)
            {
                console.log(err);
                res.status(500).json({error:"Internal server error"})
            }
        }

         const getAllVendors = async(req,res)=>
         {
            try{
               const vendors = await Vendor.find().populate('firm');                                                               //here im getting vendor record along with the firm record using populate() method.    
               res.json({vendors})
            }
            catch(err)
            {
                    console.log(err);
                    res.status(500).json({error:"Internal server error"});
            }
         }
         const getVendorById = async(req,res)=>
         {
            try {
               const vendorId = req.params.id                                                                                     //here im getting the id from the params..i mean route..& im storing this id in the vendorId
              const vendor = await Vendor.findById(vendorId).populate('firm');                                                   //here im getting vendor record along with the firm record using populate() method.
              if(!vendor)
              {
                res.status(404).json({error:"vendor not found"})
              }
              res.status(200).json({vendor})
                
            } catch (error) {
                console.log(err)
                res.status(500).json({error: "Internal server error"})    
            }
         }

    module.exports= {vendorRegister,vendorLogin, getAllVendors, getVendorById}