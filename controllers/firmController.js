//Adding firm along with vendor details (like vendor id) into the database 
const Firm = require('../models/Firm');
const Vendor = require('../models/Vendor');
const multer = require('multer');                                                                                                   //Adding images into the database using this multer package

//Got this code from gpt
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');                                                                                                   // All our  images Now in the uploads folder
    },
    filename: (req, file, cb) => {
        // Ensure files have unique names
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ storage: storage });

const addFirm = async(req,res)=>
{
    try{
        const{firmName,area,category,region,offer} = req.body;
                                                                                                                                j//This image is not coming along with above properties.it is coming separately..
        const image = req.file?req.file.filename:undefined;
        

        const vendor = await Vendor.findById(req.vendorId);                                                                     //token based id..(req.vendorid)..using these id we r checking in the database with this id is there any data exist with these id or not...if it is there we are storing in the vendor variable 
        if(!vendor)
        {
            return res.status(404).json({message:"Vendor Not Found"});
        }

        const firm = new Firm({
            firmName,area,category,region,offer,image,vendor:vendor._id 
        })
      const savedFirm = await firm.save();
      vendor.firm.push(savedFirm);
      await vendor.save();
       return res.status(200).json({message:"Firm added successfully"})
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json("Internal server error")
    }
}

const deleteFirmById = async(req,res)=>
    {
        try {
            const firmId = req.param.firmId;
            const deleteFirm = await Firm.findByIdAndDelete(firmId)
            if(!deleteFirm)
            {
                return res.status(404).json({error:"No Firm found"})
            }
            res.status(200).json({message:"Firm deleted successfully"})
        } catch (error) {
            console.log(err);
        return res.status(500).json("Internal server error")
        }
    }
//Here we are exporting image along with properties.
module.exports = {addFirm:[upload.single('image'),addFirm],deleteFirmById}
