import CategoryDb from "./model/CategoryDb.js"



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



export default {
    getCategory,
    addCategory
}