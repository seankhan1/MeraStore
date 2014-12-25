import mongoose from "mongoose";

const { Schema } = mongoose;

const categoriesSchema = new Schema({
    category: {
        type: String,
        required: true,
        trim: true
    },
    categoryName: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
        trim: true
    }
});


const CategoriesModel = mongoose.model('categories', categoriesSchema);
export default CategoriesModel
