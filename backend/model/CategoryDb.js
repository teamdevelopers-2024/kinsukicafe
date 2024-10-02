import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});

const CategoryDb = mongoose.model("CategoryDb", categorySchema);

export default CategoryDb;