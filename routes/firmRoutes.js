//Firm Routes

//here we r adding firm based upon token

const firmController = require('../controllers/firmController')
const verifyToken = require('../middlewares/verifyToken')

                                                                                                                                /*In this express we have an inbuilt method called Router() method.By using this method we can define a route with an endpoint key*/
const express = require('express');                                                                                             // we need express js to create routes

const router = express.Router();
router.post('/add-firm',verifyToken,firmController.addFirm)
router.get('/uploads/:imageName', (req,res)=>{                                                                                      //here uploads is not only a path ..its a folder..in that we have images..that images name we have to provide dynamically in the route
    const imageName = req.params.imageName;
    res.headersSent('content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '..', 'uploads',imageName));
});
router.delete('/:firmId',firmController.deleteFirmById);

module.exports = router;