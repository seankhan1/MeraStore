import express from 'express'
import formValidator from '../middlewares/formValidator.middlewares.js'
import userControllers from '../controllers/user.controllers.js'
import authorization from '../middlewares/auth.middlewares.js'

const router = express.Router()

router.post('/registration', formValidator.registration, userControllers.registration)
router.post('/login', formValidator.login, userControllers.login)
router.get('/getuser', authorization, userControllers.getUser)
router.post('/change-password', authorization, formValidator.changePassword, userControllers.changePassword)
router.post('/update-address', authorization, formValidator.address, userControllers.updateAddress)
router.post('/refresh-token', userControllers.refreshToken)
router.post("/send-reset-password-email", formValidator.sendEmail, userControllers.sendUserPasswordResetEmail)
router.post("/reset-password", authorization, formValidator.changePassword, userControllers.userPasswordReset)
// router.delete('/delete-user/:userID', authorization, userControllers.deleteUser)
export default router