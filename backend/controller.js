import CategoryDb from "./model/CategoryDb.js"
import ExpenseDb from "./model/ExpenseDb.js"
import itemDb from "./model/ItemsDb.js"
import orderDb from "./model/OrderDb.js"



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

async function addOrder(req,res) {
    try {
        const data = req.body
        console.log(req.body)
        await orderDb.create({
            Date:data.date,
            totalAmount:data.totalAmount,
            orderDetails:data.orderDetails
        })
        res.status(200).json({
            error:false,
            message:"Order Added Successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error:true,
            message:"Internel Server Error"
        })
    }
}



async function getOrders(req,res) {
    try {
        const data = await orderDb.find().sort({_id:-1})
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



async function getExpense(req,res) {
    try {
        const data = await ExpenseDb.find().sort({_id:-1})
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


async function addExpense(req,res) {
    try {
        const data = req.body
        await ExpenseDb.create({
            date:data.date,
            expenseDetail:data.expenseDetail,
            totalExpense:data.totalExpense
        })
        res.status(200).json({
            error:false,
            message:"expense addedd successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error:true,
            message:"Internel Server Error"
        })
    }
}

async function getHomeData(req, res) {
    try {
        const now = new Date();
        const offset = 5.5 * 60 * 60 * 1000;
        const istDate = new Date(now.getTime() + offset);

        const startOfToday = new Date(istDate.getFullYear(), istDate.getMonth(), istDate.getDate());
        const endOfToday = new Date(istDate.getFullYear(), istDate.getMonth(), istDate.getDate() + 1);

        const startOfYesterday = new Date(istDate.getFullYear(), istDate.getMonth(), istDate.getDate() - 1);
        const endOfYesterday = new Date(istDate.getFullYear(), istDate.getMonth(), istDate.getDate());

        // Fetch today's orders
        const ordersToday = await orderDb.find({
            Date: {
                $gte: startOfToday,
                $lt: endOfToday,
            },
        });
        
        // Calculate total revenue and total orders today
        const totalRevenue = ordersToday.reduce((acc, order) => acc + order.totalAmount, 0);
        const totalOrdersToday = ordersToday.length;

        // Fetch today's expenses
        const expensesToday = await ExpenseDb.find({
            date: {
                $gte: startOfToday,
                $lt: endOfToday,
            },
        });
        const totalExpenses = expensesToday.reduce((acc, expense) => acc + expense.totalExpense, 0);

        // Fetch yesterday's orders
        const ordersYesterday = await orderDb.find({
            Date: {
                $gte: startOfYesterday,
                $lt: endOfYesterday,
            },
        });
        const yesterdayRevenue = ordersYesterday.reduce((acc, order) => acc + order.totalAmount, 0);

        // Get top 10 sold items
        const topSoldItems = await orderDb.aggregate([
            { $unwind: "$orderDetails" }, // Flatten the order details array
            {
                $group: {
                    _id: "$orderDetails.item", // Group by item name
                    totalQuantity: { $sum: "$orderDetails.quantity" }, // Sum the quantities sold
                },
            },
            { $sort: { totalQuantity: -1 } }, // Sort by total quantity sold in descending order
            { $limit: 10 }, // Limit to top 10 items
        ]);

        console.log(topSoldItems)

        res.status(200).json({
            error: false,
            data:{
                todayIncome: totalRevenue,
                todayExpense: totalExpenses,
                todayCustomerCount: totalOrdersToday,
                yesterdayIncome: yesterdayRevenue,
                topSoldItems: topSoldItems, // Include top sold items in the response
            }
        });
        
    } catch (error) {
        console.error("Error fetching today's revenue and expenses:", error);
        res.status(500).json({ error: true, message: "Could not fetch revenue and expense data" });
    }
}




export default {
    getCategory,
    addCategory,
    addItem,
    getItems,
    addOrder,
    getOrders,
    getExpense,
    addExpense,
    getHomeData
}