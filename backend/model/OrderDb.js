import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    Date: {
        type: Date,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    orderDetails: [
        {
            item: {
                type: String,
            },
            quantity: {
                type: Number,
            },
            total: {
                type:Number,
                default:`REF${Date.now()}`
            },
        },
    ],
});

const orderDb = mongoose.model("Order", orderSchema);

export default orderDb;