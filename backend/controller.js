import CategoryDb from "./model/CategoryDb.js"
import itemDb from "./model/ItemsDb.js"



async function getCategory(req,res){
    try {
        const data = await CategoryDb.find().sort({_id:-1})

        res.status(200).json({
            error:false,
            data:data
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error:true,
            message:"Internel Server Error"
        })
    }
}



async function addCategory(req,res) {
    try {
        const category = req.body.categoryName
        const isCat = await CategoryDb.findOne({name:category})
        if(isCat){
            return res.status(400).json({
                error:true,
                message:"Category is Already Exist"
            })
        }
        await CategoryDb.create({
            name:category
        })
        res.status(200).json({
            error:false,
            message:"category added successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error:true,
            message:"Internel Server Error"
        })
    }
}


async function addItem(req,res) {
    try {
        const data = req.body
        const isItem = await itemDb.findOne({name:data.name})
        if(isItem){
            return res.status(400).json({
                error:true,
                message:"The Item Is Already Exist"
            })
        }
        await itemDb.create({
            name:data.name,
            category:data.category,
            price:data.price
        })
        await CategoryDb.updateOne(
            { name: data.category },          
            { $inc: { totalItems: 1 } }       
          );
        res.status(200).json({
            error:false,
            message:"item Added Successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error:true,
            message:"Internal Server Error"
        })
    }
}



async function getItems(req,res) {
    try {
        const data = await itemDb.find().sort({_id:-1})
        res.status(200).json({
            error:false,
            data:data
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error:true,
            message:"Internel Server Error"
        })
    }
}



export default {
    getCategory,
    addCategory,
    addItem,
    getItems
}