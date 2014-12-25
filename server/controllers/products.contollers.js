import ProductModel from "../models/products.models.js"
import CategoriesModel from '../models/categories.models.js'
import axios from "axios"
import dotenv from 'dotenv'
import { validationResult } from 'express-validator'
import UsersModel from "../models/users.models.js"

dotenv.config()
const FETCH_AND_STORE_FLAG = process.env.FETCH_AND_STORE_FLAG

export default {

    // Storing Dummy Data 
    storeProducts: async (req, res) => {
        const { admin } = req.user
        if (!admin) {
            return res.status(401).json({
                "status": "Failed",
                "message": "Admin has permission."
            })
        }

        if (FETCH_AND_STORE_FLAG === "false")
            return res.status(401).json({
                "status": "Failed",
                "message": "Required permission."
            })

        try {
            const productResponse = await axios.get("https://dummyjson.com/products?limit=100")
            for (const item of productResponse.data.products) {
                const {
                    title,
                    description,
                    price,
                    discountPercentage,
                    rating,
                    brand,
                    category,
                    thumbnail,
                    images
                } = item;

                const product = new ProductModel({
                    title,
                    description,
                    price,
                    discountPercentage,
                    rating,
                    brand,
                    category,
                    thumbnail,
                    images
                });

                await product.save();
            }

            // const categoriesResponse = await axios.get('https://dummyjson.com/products/categories')
            // for (const category of categoriesResponse.data) {
            //     const categorySave = new CategoriesModel({ categoryName: category })
            //     await categorySave.save()
            // }

            return res.status(200).json({
                "status": "Success",
                "message": "Dummy data & Categories saved in database"
            })
        } catch (error) {
            return res.status(500).json({
                "status": "Failed",
                "message": "Internal Server Error!"
            });
        }
    },

    fetchCategorise: async (req, res) => {
        try {
            const categories = await CategoriesModel.find()
            // throw Error
            return res.status(200).json({
                status: "Success",
                categories
            })
        } catch {
            return res.status(500).json({
                "status": "Failed",
                "message": "Internal Server Error!"
            });
        }
    },

    // Fetch all products
    fetchProducts: async (req, res) => {
        const maxResult = Number(req.query.maxResult) || 10;
        const page = Number(req.query.page) || 1;
        const price = req.query.price || "";
        const category = req.query.category || "";
        const search = req.query.search || "";

        const skip = (page - 1) * maxResult;

        const searchQuery = {
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ],
        };

        const filterQuery = {};

        if (category) {
            filterQuery.category = category;
        }

        if (price === "<= 500") {
            filterQuery.price = { $lte: 500 };
        } else if (price === "500 <= 1000") {
            filterQuery.price = { $gte: 500, $lte: 1000 };
        } else if (price === "> 1000") {
            filterQuery.price = { $gt: 1000 };
        }


        try {
            const productsFilter = await ProductModel.find({
                ...filterQuery,
                ...searchQuery,
            })
                .skip(skip)
                .limit(maxResult);

            const totalItems = await ProductModel.countDocuments({
                ...searchQuery,
                ...filterQuery,
            });
            const totalPages = Math.ceil(totalItems / maxResult);

            return res.status(200).json({
                pageInfo: {
                    page,
                    maxResult,
                    totalItems,
                    totalPages,
                },
                productsFilter,
            });
        } catch (error) {
            return res.status(500).json({
                status: "Failed",
                message: "Internal Server Error!",
            });
        }
    },

    // Fetch Products by ID
    fetchProductById: async (req, res) => {
        try {
            const _id = req.params.id
            const product = await ProductModel.findById(_id)
            return res.status(200).json(product)
        } catch {
            return res.status(404).json({
                "status": "Failed",
                "message": "Product Not Found!"
            })
        }
    },

    addProduct: async (req, res) => {
        // const { admin } = req.user
        // if (!admin) {
        //     return res.status(401).json({
        //         "status": "Failed",
        //         "message": "Admin has permission."
        //     })
        // }

        const responseValidator = validationResult(req);
        if (!responseValidator.isEmpty()) {
            return res.status(406).json({
                "status": "Failed",
                "message": responseValidator.array().map((err) => err.msg)
            });
        }

        const { title, description, price, discountPercentage, rating, brand, category, thumbnail, images } = req.body
        try {
            const product = new ProductModel({
                title,
                description,
                price,
                discountPercentage,
                rating,
                brand,
                category,
                thumbnail,
                images
            });

            await product.save()
            return res.status(201).json({
                "status": "Success",
                "message": "Product Added",
            });
        } catch {

        }

    },

    // Update Product By Id
    updateProduct: async (req, res) => {
        const { admin } = req.user
        if (!admin) {
            return res.status(401).json({
                "status": "Failed",
                "message": "Admin has permission."
            })
        }
        const _id = req.params.id;
        const product = await ProductModel.findById(_id)

        if (!product) {
            return res.status(404).json({
                status: "Failed",
                message: "Product Not Found!"
            });
        }

        try {
            await ProductModel.findOneAndUpdate(
                { _id },
                req.body,
                { new: true }
            );

            return res.status(200).json({
                status: "Success",
                message: "Product Updated",
            });
        } catch {
            return res.status(500).json({
                status: "Failed",
                message: "Internal Server Error!"
            });
        }
    },

    deleteProduct: async (req, res) => {
        const { admin } = req.user
        if (!admin) {
            return res.status(401).json({
                "status": "Failed",
                "message": "Admin has permission."
            })
        }
        const _id = req.params.id;
        const product = await ProductModel.findById(_id)

        if (!product) {
            return res.status(404).json({
                status: "Failed",
                message: "Product Not Found!"
            });
        }

        try {
            await ProductModel.deleteOne({ _id });
            return res.status(200).json({
                status: "Success",
                message: "Product Deleted",
            });
        } catch {
            return res.status(500).json({
                status: "Failed",
                message: "Internal Server Error!"
            });
        }
    },

    wishlistAdd: async (req, res) => {
        const { _id } = req.user;
        const product_id = req.params.id;

        try {
            const product = await ProductModel.findById(product_id);
            if (!product) {
                return res.status(404).json({
                    status: "Failed",
                    message: "Product Not Found!"
                });
            }

            const user = await UsersModel.findById(_id);

            if (!user) {
                return res.status(404).json({
                    status: "Failed",
                    message: "User Not Found!"
                });
            }

            if (user.wishlist.includes(product_id)) {
                return res.status(400).json({
                    status: "Failed",
                    message: "Product already in the wishlist."
                });
            }

            // If the product is not in the wishlist, add it
            user.wishlist.push(product_id);
            await user.save();

            return res.status(201).json({
                status: "Success",
                message: "Added to wishlist."
            });
        } catch (error) {
            return res.status(500).json({
                status: "Failed",
                message: "Internal Server Error!"
            });
        }
    },

    wishlistDelete: async (req, res) => {
        const { _id } = req.user;
        const product_id = req.params.id;

        try {
            const user = await UsersModel.findById(_id);

            if (!user) {
                return res.status(404).json({
                    status: 'Failed',
                    message: 'User Not Found!',
                });
            }

            // Check if the product is in the user's wishlist
            const productIndex = user.wishlist.indexOf(product_id);

            if (productIndex === -1) {
                return res.status(400).json({
                    status: 'Failed',
                    message: 'Product is not in the wishlist!',
                });
            }

            // Remove the product from the wishlist
            user.wishlist.splice(productIndex, 1);

            await user.save();

            return res.status(200).json({
                status: 'Success',
                message: 'Removed from wishlist.',
            });
        } catch (error) {
            return res.status(500).json({
                status: 'Failed',
                message: 'Internal Server Error!',
            });
        }
    }


}
