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



export default {
    getCategory
}