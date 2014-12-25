import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
});

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    items: [cartItemSchema],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create the Cart model
const CartModel = mongoose.model('cart', cartSchema);

export default CartModel;
