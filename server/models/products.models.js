import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    discountPercentage: {
        type: Number,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        required: true,
        trim: true
    },
    brand: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    thumbnail: {
        type: String,
        required: true,
        trim: true
    },
    images: {
        type: [String],
        required: true,
        trim: true
    }
});

const ProductModel = mongoose.model('products', productSchema);
export default ProductModel
