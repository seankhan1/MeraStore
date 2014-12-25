import { body } from "express-validator";

export default {
    // Registration & Login Input Validation 
    registration: [
        body('name', "Name must have atleast 3 characters").isLength(3),
        body('email', 'Email is invalid!').isEmail(),
        body('address', 'Address is too short').isLength(10),
        body('password', 'Password must have atleast 7 characters').isLength(7)
    ],

    login: [
        body('email', 'Email is invalid!').isEmail(),
        body('password', "Password must have atleast 7 characters").exists()
    ],

    changePassword: [
        body('password', "Password must have atleast 7 characters").isLength(7)
    ],

    sendEmail: [
        body('email', 'Email is invalid!').isEmail()
    ],

    address: [
        body('address', 'Address must have atleast 10 characters.').isLength(10)
    ],

    addProduct: [
        body("title").exists(),
        body("description").exists(),
        body("price").exists().isNumeric(),
        body('discountPercentage').exists().isNumeric(),
        body("rating").exists().isNumeric(),
        body('brand').exists(),
        body('category').exists(),
        body('thumbnail').exists(),
        body('images').exists()
    ]
}