import { validationResult } from "express-validator";
import UsersModel from "../models/users.models.js";
import bcrypt from 'bcrypt';
import { jwtVerify, tokenGenerator } from "../config/token.config.js";
import { mailOptions, transporter } from "../config/email.config.js";

const GEN_SALT = 10

export default {

    // User Registration 
    registration: async (req, res) => {
        const responseValidator = validationResult(req);
        if (!responseValidator.isEmpty()) {
            return res.json({
                "status": "Failed",
                "message": responseValidator.array().map((err) => err.msg)
            });
        }


        try {
            const { name, address, email, password, confirm_password, admin } = req.body;
            const userExist = await UsersModel.findOne({ email });

            if (userExist) {
                return res.json({
                    "status": "Failed",
                    "message": "Email already exists!"
                });
            }

            if (password !== confirm_password) {
                return res.json({
                    "status": "Failed",
                    "message": "Password & Confirm Password doesn't match!"
                });
            }

            const salt = await bcrypt.genSalt(GEN_SALT);
            const hashPassword = await bcrypt.hash(password, salt);


            const newUser = new UsersModel({
                name,
                address,
                email,
                password: hashPassword,
                admin: admin || false
            });

            await newUser.save();
            const { accessToken, refreshToken } = tokenGenerator(newUser._id, email, admin || false)


            return res.json({
                "status": "Success",
                "message": "User registration successfully.",
                accessToken,
                refreshToken
            });
        } catch (error) {
            return res.json({
                "status": "Failed",
                "message": "Internal Server Error!"
            });
        }
    },

    // User Login 
    login: async (req, res) => {
        const responseValidator = validationResult(req);
        if (!responseValidator.isEmpty()) {
            return res.json({
                "status": "Failed",
                "message": responseValidator.array().map((err) => err.msg)
            });
        }

        try {
            const { email, password } = req.body;
            const userExist = await UsersModel.findOne({ email });

            if (!userExist) {
                return res.json({
                    "status": "Failed",
                    "message": "User not found. Please register first."
                });
            }

            const userVerification = await bcrypt.compare(password, userExist.password)
            if (!userVerification) {
                return res.json({
                    "status": "Failed",
                    "message": 'Password is invalid!'
                });
            }
            const userIdAsString = userExist._id;
            const { accessToken, refreshToken } = tokenGenerator(userIdAsString, userExist.email, userExist.admin)
            return res.json({
                "status": "Success",
                "message": "Login successfully.",
                accessToken, refreshToken
            });

        } catch (error) {
            console.error(error);
            return res.json({
                "status": "Failed",
                "message": "Internal Server Error!"
            });
        }
    },

    getUser: async (req, res) => {
        try {
            const { _id } = req.user
            const user = await UsersModel.findById(_id).populate({
                path: "wishlist",
                model: "products"
            })

            if (!user) {
                res.status(200).json({
                    status: "Failed",
                    message: "User Data Not Found",
                })
            }
            res.status(200).json({
                status: "Success",
                message: "User Data Found",
                user
            })
        } catch (error) {
            console.log(error.message)
            res.status(401).json({
                status: "Failed",
                message: "Internal Server Error!"
            })
        }
    },

    // User Password Change 
    changePassword: async (req, res) => {

        const responseValidator = validationResult(req);
        if (!responseValidator.isEmpty()) {
            return res.json({
                "status": "Failed",
                "message": "Password must have atleast 7 characters"
            });
        }

        const { password, confirm_password } = req.body

        if (password !== confirm_password) {
            return res.json({
                "status": "Failed",
                "message": "Password & Confirm Password doesn't match!"
            });
        }

        try {
            const { email, admin } = req.user
            const salt = await bcrypt.genSalt(GEN_SALT)
            const hashPassword = await bcrypt.hash(password, salt)
            const user = await UsersModel.findOneAndUpdate({ email }, { password: hashPassword }, { new: true })
            console.log(user)


            tokenGenerator(email, admin)

            return res.json({
                status: "Success",
                message: "Password Updated.",
            });
        } catch {
            return res.json({
                status: "Failed",
                message: "Internal Server Error!"
            });
        }
    },

    updateAddress: async (req, res) => {
        const responseValidator = validationResult(req);
        if (!responseValidator.isEmpty()) {
            return res.json({
                "status": "Failed",
                "message": "Address must have atleast 10 characters."
            });
        }

        try {
            const { email } = req.user
            const { address } = req.body
            await UsersModel.findOneAndUpdate({ email }, { address })
            return res.json({
                "status": "Success",
                "message": "Updated Successfully."
            })
        } catch {
            res.json({
                "status": "Failed",
                "message": "Internal Server Error!"
            })
        }
    },

    // Refresh Token
    refreshToken: async (req, res) => {
        // JWT Verify for new Access Token 
        jwtVerify(req, res)
    },

    // Sending email to user 
    sendUserPasswordResetEmail: async (req, res) => {
        const responseValidator = validationResult(req);
        if (!responseValidator.isEmpty()) {
            return res.json({
                "status": "Failed",
                "message": "Invalid Email!"
            });
        }
        try {
            const { email } = req.body;
            const user = await UsersModel.findOne({ email })
            if (!user)
                return res.json({
                    "status": "Failed",
                    "message": "User not found with this email."
                });

            const { accessToken, refreshToken } = tokenGenerator(user._id, user.email, user.admin || false)


            transporter.sendMail(mailOptions(email), (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                    res.json({
                        "status": "Failed",
                        "message": "Error sending email"
                    });
                } else {
                    // console.log('Email sent:', info.response);
                    res.json({
                        "status": "Success",
                        "message": "Email sent.",
                        accessToken,
                        refreshToken
                    });
                }
            });
        } catch (error) {
            res.json({
                "status": "Failed",
                "message": "Internal Server Error"
            });
        }
    },

    // Reset Password 
    userPasswordReset: async (req, res) => {
        const responseValidator = validationResult(req);
        if (!responseValidator.isEmpty()) {
            return res.json({
                "status": "Failed",
                "message": "Password must have atleast 7 characters"
            });
        }

        const { password, confirm_password } = req.body

        if (password !== confirm_password) {
            return res.json({
                "status": "Failed",
                "message": "Password & Confirm Password doesn't match!"
            });
        }

        try {
            const { _id } = req.user;
            const user = await UsersModel.findById(_id)
            console.log(user)
            if (!user)
                return res.json({
                    "status": "Failed",
                    "message": "User not found with this email."
                });

            const salt = await bcrypt.genSalt(GEN_SALT)
            const hashPassword = await bcrypt.hash(password, salt)
            await UsersModel.findByIdAndUpdate({ _id }, { password: hashPassword })
            return res.json({
                status: "Success",
                message: "Reset Password."
            });
        } catch (error) {
            console.error(error);
            res.json({
                "status": "Failed",
                "message": "Internal Server Error"
            });
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { email } = req.user
            await UsersModel.deleteOne({ email })
            return res.json({
                status: "Success",
                message: "Account Deleted",
            });
        } catch {
            return res.json({
                status: "Failed",
                message: "Internal Server Error!",
            });
        }
    }
}