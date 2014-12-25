import express from 'express'
import productsController from '../controllers/products.contollers.js'
import authorization from '../middlewares/auth.middlewares.js'
import formValidatorMiddlewares from '../middlewares/formValidator.middlewares.js'

const router = express.Router()



// Product Endpoint
router.get('/fetch-and-store-data', authorization, productsController.storeProducts)
router.get('/fetch-products', productsController.fetchProducts)
router.get('/categories', productsController.fetchCategorise)
router.get('/:id', productsController.fetchProductById)
router.post('/add-product', authorization, formValidatorMiddlewares.addProduct, productsController.addProduct)
router.patch('/update/:id', authorization, productsController.updateProduct)
router.delete('/delete/:id', authorization, productsController.deleteProduct)
router.patch('/wishlist/:id', authorization, productsController.wishlistAdd)
router.delete('/wishlist/:id', authorization, productsController.wishlistDelete)


export default router