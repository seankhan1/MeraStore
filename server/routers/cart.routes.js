import express from 'express'
import cartController from '../controllers/cart.controllers.js'
import authorization from '../middlewares/auth.middlewares.js'

const router = express.Router()

router.post('/add', authorization, cartController.addToCart)
router.get('/items', authorization, cartController.fetchCart)
router.patch('/update/:_id', authorization, cartController.updateCart)
router.delete('/delete/:_id', authorization, cartController.deleteCart)

export default router