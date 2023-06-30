import express from 'express'
const router = express.Router()
import { getProducts, getProductById, deleteProduct, updateProduct, createProduct } from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct)


// // @desc Fetch all products
// // @route GET /api/products
// // @access Public
// router.get(
//     '/',
//     asyncHandler(async (req, res) => {
//         const products = await Product.find({})

//         res.json(products)
//     })
// )

// // @desc Fetch single product
// // @route GET /api/products/:id
// // @access Public
// router.get('/:id', asyncHandler(async(req, res) => {
//     const product = await Product.findById(req.params.id)

//     if(product) {
//         res.json(product)
//     } else {
//         res.status(404)
//         throw new Error('Product not found')
//     }

//     // res.json(product)
// }))

export default router