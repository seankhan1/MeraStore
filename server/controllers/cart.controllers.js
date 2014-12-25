import CartModel from "../models/cart.models.js";
import ProductModel from "../models/products.models.js";

export default {
    addToCart: async (req, res) => {
        try {
            const { product_id, quantity } = req.body;
            const product = await ProductModel.findById(product_id);

            if (!product) {
                return res.json({
                    status: "Failed",
                    message: "Product not found!"
                });
            }

            const cartUser = await CartModel.findOne({ user: req.user._id });

            if (!cartUser) {
                const newItem = new CartModel({
                    user: req.user._id,
                    items: [{ product: product_id, quantity: quantity }]
                })
                await newItem.save()
                return res.json({
                    state: "Success",
                    message: "Product added to the cart."
                })
            }


            const itemExist = cartUser.items.find((item) => item.product.toString() === product_id)
            if (itemExist) {
                return res.status(400).json({
                    status: "Failed",
                    message: "Product already in the cart."
                });
            }

            cartUser.items.push({
                product: product._id,
                quantity: quantity || 1
            })

            await cartUser.save()

            return res.json({
                status: "Success",
                message: "Product added to the cart successfully",
            });
        } catch (error) {
            return res.status(500).json({
                status: "Failed",
                message: "Internal Server Error!",
            });
        }
    },

    fetchCart: async (req, res) => {
        try {
            const cartItem = await CartModel.findOne({ user: req.user._id }).populate([
                {
                    path: "user",
                    model: 'users'
                },
                {
                    path: "items",
                    populate: {
                        path: "product",
                        model: "products"
                    }
                }
            ]);
            console.log(cartItem)
            return res.json({
                status: "Success",
                message: "Product fetched",
                cartItems: cartItem.items,
                cart_id: cartItem._id
            })
        } catch {
            return res.json({
                status: "Failed",
                message: 'Internal Server Error!'
            })
        }
    },

    updateCart: async (req, res) => {
        try {
            const cart = await CartModel.findOne({ user: req.user._id });

            if (!cart) {
                return res.json({
                    status: "Failed",
                    message: "Cart Item Not Found!"
                });
            }

            const updatedItem = cart.items.find(item => item.product.toString() === req.params._id);

            if (!updatedItem) {
                return res.json({
                    status: "Failed",
                    message: "Cart Item Not Found!"
                });
            }

            updatedItem.quantity = req.body.quantity;

            await cart.save();

            return res.json({
                status: "Success",
                message: "Cart Item Updated Successfully."
            });
        } catch (error) {
            console.error(error); // Log the error for debugging
            return res.status(500).json({
                status: "Failed",
                message: "Internal Server Error!"
            });
        }
    },

    deleteCart: async (req, res) => {
        try {
            const cart = await CartModel.findOne({ user: req.user._id });

            const index = cart.items.findIndex(item => item.product.equals(req.params._id));

            if (index === -1) {
                return res.json({
                    status: "Failed",
                    message: "Cart Item not found."
                });
            }

            cart.items.splice(index, 1);
            await cart.save();

            return res.json({
                status: "Success",
                message: "Cart item deleted."
            });
        } catch (error) {
            console.error(error);
            return res.json({
                status: "Failed",
                message: "Internal Server Error!"
            });
        }
    }

};
