import mongoose from "mongoose";
const { Schema } = mongoose

const usersSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        required: true
    },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products' }]
})

const UsersModel = mongoose.model("users", usersSchema)
export default UsersModel