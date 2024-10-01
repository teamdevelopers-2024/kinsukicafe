import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});

const categoryDb = mongoose.model("Category", categorySchema);

export default categoryDb;