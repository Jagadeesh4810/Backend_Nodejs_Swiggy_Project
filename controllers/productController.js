const Product = require('../models/Product')
const Firm = require('../models/Firm')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');                                                                                                   // All our  images Now in the uploads folder
    },
    filename: (req, file, cb) => {
        // Ensure files have unique names
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const addProduct =  async(req,res)=>{
    try {
        const{productName,price,category,bestseller,description} = req.body;
        const image = req.file?req.file.filename:undefined;
        const firmId = req.params.id;
        const firm = await Firm.findById(firmId)
        if(!firm)
        {
            return res.status(404).json({error:"No firm found"})
        }

       const product= new Product({
        productName,price,category,bestseller,description,image,firm:firm._id
       })

        const savedProduct = await product.save();
        firm.products.push(savedProduct)
        await firm.save();
        res.status(200).json({message:"Product added successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"})
        
    }
}

const getProductByFirm = async(req,res)=>
{
    try {
        const firmId = req.params.id
       const firm = await Firm.findById(firmId)
        if(!firm)
        {
            return res.status(404).json({error:"No firm found"})
        }
        const restaurantName = firm.firmName
        const products = await Product.find({firm:firm._id})

            res.json({restaurantName,products});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"})
    }
}

const deleteProductById = async(req,res)=>
{
    try {
        const productId = req.param.productId;
        const deleteProduct = await Product.findByIdAndDelete(productId)
        if(!deleteProduct)
        {
            return res.status(404).json({error:"No Product found"})
        }
        res.status(200).json({message:"Product deleted successfully"})
    } catch (error) {
        console.log(err);
        return res.status(500).json("Internal server error")
    }
}

module.exports = {addProduct:[upload.single('image'), addProduct],getProductByFirm,deleteProductById};