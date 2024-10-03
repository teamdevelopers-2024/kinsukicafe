import mongoose from "mongoose";

// Define order schema
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
                type: Number,
            },
        },
    ],
    referenceNumber: {
        type: String, 
        unique: true, 
        required: true,
    },
});

// Pre-save hook to generate unique reference number
orderSchema.pre('save', async function (next) {
    const order = this;

    // Check if reference number is already set
    if (!order.referenceNumber) {
        try {
            const lastOrder = await mongoose
                .model('Order')
                .findOne()
                .sort({ _id: -1 });

            const lastNumber = lastOrder ? parseInt(lastOrder.referenceNumber.slice(1)) : 0;
            const newReferenceNumber = `#${lastNumber + 1}`;

            order.referenceNumber = newReferenceNumber;
        } catch (error) {
            next(error);
        }
    }

    next();
});

// Create and export order model
const orderDb = mongoose.model("Order", orderSchema);

export default orderDb;
