import express from 'express'
import orderControllers from '../controllers/order.controllers.js'
import authorization from '../middlewares/auth.middlewares.js'
const router = express.Router()

router.post('/create-order', authorization, orderControllers.orderCreate)
router.post('/paymentVerify', authorization, orderControllers.paymentVerify)
router.get('/get-api-key', authorization, orderControllers.getKey)
router.get('/fetch', authorization, orderControllers.fetchOrders)

export default router   