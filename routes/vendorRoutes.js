const vendorController = require('../controllers/vendorController');

                                                                                                                                    /*In this express we have an inbuilt method called Router() method.By using this method we can define a route with an endpoint key*/
const express = require('express');                                                                                             // we need express js to create routes

const router = express.Router(); 
router.post('/register',vendorController.vendorRegister);
router.post('/login',vendorController.vendorLogin);
router.get('/all-vendors',vendorController.getAllVendors);
router.get('/single-vendor/:id',vendorController.getVendorById)                                                                 //here we should give id dynamically in the route

module.exports = router;
