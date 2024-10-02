import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    date:{
        type:Date,
        required:true
    },
    expenseType:{
        type:String,
        required:true
    },
    totalExpense:{
        type:Number,
        required:true
    },
    expenseDetails:[
        {
            description:{
                type:String,
            },
            amount:{
                type:Number
            },
            reference:{
                type:String
            }
        }
    ]
});

const ExpenseDb = mongoose.model("Expense", expenseSchema);

export default ExpenseDb;
