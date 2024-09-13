const express = require('express')
const productController = require('../controllers/productController')
const router = express.Router();
router.post('/add-product/:id',productController.addProduct)
router.get('/:id/products', productController.getProductByFirm)                                                                        //here we should give id dynamically in the route......here(: colon) represents dynamic...dynamically we give id
router.get('/uploads/:imageName', (req,res)=>{                                                                                  //here uploads is not only a path ..its a folder..in that we have images..that images name we have to provide dynamically in the route
    const imageName = req.params.imageName;
    res.headersSent('content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '..', 'uploads',imageName));
});
router.delete('/:productId',productController.deleteProductById);

module.exports = router;
