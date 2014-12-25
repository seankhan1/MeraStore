import OrderModel from "../models/order.models.js";
import Razorpay from 'razorpay'
import crypto from 'crypto'
import CartModel from "../models/cart.models.js";

export default {
    orderCreate: async (req, res) => {
        const { totalAmount } = req.body;

        try {
            const instance = new Razorpay({
                key_id: process.env.KEY_ID,
                key_secret: process.env.KEY_SECRET,
            });

            const options = {
                amount: totalAmount * 100,
                currency: 'USD',
                receipt: crypto.randomBytes(10).toString('hex'),
            };

            instance.orders.create(options, (error, order) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({
                        message: 'Something Went Wrong!',
                    });
                }
                res.status(200).json({ data: order });
            });

        } catch (error) {
            return res.status(500).json({
                status: "Failed",
                message: error.message
            });
        }
    },

    getKey: async (req, res) => {
        try {
            return res.json({
                key_id: process.env.KEY_ID
            })
        } catch {
            return res.json({
                status: "Failed",
                message: "Internal Server Error!"
            })
        }
    },

    paymentVerify: async (req, res) => {
        try {
            const {
                razorpayPaymentId,
                razorpayOrderId,
                razorpaySignature,
                cart,
                totalAmount,
                cart_id
            } = req.body;

            const sign = razorpayOrderId + '|' + razorpayPaymentId;

            const expectedSign = crypto
                .createHmac('sha256', process.env.KEY_SECRET)
                .update(sign.toString())
                .digest('hex');

            if (razorpaySignature === expectedSign) {
                const userId = req.user._id;
                const existingOrder = await OrderModel.findOne({ user: userId });
                if (existingOrder) {
                    existingOrder.orderDetails.push({
                        products: cart.map(item => ({
                            item: item.productId,
                            quantity: item.quantity
                        })),
                        orderDate: new Date(),
                        totalAmount: totalAmount,
                        orderStatus: "Pending",
                    });

                    await existingOrder.save();
                } else {
                    const newOrder = new OrderModel({
                        user: userId,
                        orderDetails: [
                            {
                                products: cart.map(item => ({
                                    item: item.productId,
                                    quantity: item.quantity
                                })),
                                orderDate: new Date(),
                                totalAmount: totalAmount,
                                orderStatus: "Pending",
                            },
                        ],
                    });

                    await newOrder.save();
                }

                await CartModel.findByIdAndDelete(cart_id)
                return res.status(200).json({
                    status: "Success",
                    message: 'Payment verified successfully'
                });

            } else {
                return res.status(400).json({
                    status: "Failed",
                    message: 'Invalid signature sent'
                });
            }
        } catch (error) {
            console.error(error); // Log the error for debugging
            return res.status(500).json({
                status: "Failed",
                message: 'Internal Server Error'
            });
        }
    },

    fetchOrders: async (req, res) => {
        try {
            const orders = await OrderModel.findOne({ user: req.user._id })
                .populate({
                    path: 'orderDetails',
                    populate: {
                        path: 'products',
                        populate: {
                            path: "item",
                            model: "products"
                        }
                    }
                })

            orders.orderDetails.sort((a, b) => b.orderDate - a.orderDate);

            return res.json({
                status: "Success",
                message: "Fetched Succesfully",
                orders
            })
        } catch (error) {
            return res.status(500).json({
                status: "Failed",
                message: error.message
            })
        }
    },
};
