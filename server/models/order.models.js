import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    orderDetails: [{
        products: [
            {
                item: {
                    type: Schema.Types.ObjectId,
                    ref: 'products',
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                }
            },
        ],
        orderDate: {
            type: Date,
            default: Date.now
        },
        totalAmount: {
            type: Number,
            required: true
        },
        orderStatus: {
            type: String,
            enum: ['Pending', 'Shipped', 'Delivered'],
            required: true
        }
    }]
});

const OrderModel = mongoose.model('order', orderSchema);

export default OrderModel;
