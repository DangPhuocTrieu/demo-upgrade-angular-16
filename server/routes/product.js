import express from 'express'
import Product from '../models/Product.js'

const router = express.Router()

// GET ALL PRODUCTS
router.get('/', async (req, res) => {
    try {
        const products = await Product.find()

        res.status(200).json({ 
            success: true, 
            message: 'Get all products successfully!', 
            data: products
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})

// GET PRODUCT
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        res.status(200).json({ 
            success: true, 
            message: 'Get product successfully!', 
            data: product
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})

// ADD REVIEW
router.post('/review/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            { _id: req.params.id },
            { $push: { reviews: req.body } }, 
            { new: true } 
        )

        // const product = await Product.findById(req.params.id)
        // await product.updateOne({ $push: { reviews: req.body } })

        res.status(200).json({ 
            success: true, 
            message: 'Add review successfully!', 
            data: updatedProduct
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})


// ADMIN

// ADD PRODUCT
router.post('/', async (req, res) => {
    try {
        const newProduct = new Product(req.body)
        const savedUser = await newProduct.save()

        res.status(200).json({ 
            success: true, 
            status: 'CREATE',
            message: 'Add product successfully!', 
            data: savedUser
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})

// EDIT PRODUCT
router.put('/:id', async (req, res) => {
    try {
        const productUpdated = await Product.findOneAndUpdate(
            { _id: req.params.id },
            { ...req.body },
            { new: true }
        )

        res.status(200).json({
            success: true,
            status: 'EDIT',
            message: 'Update product successfully!',
            data: productUpdated
         })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})

// DELETE PRODUCT
router.delete('/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)

        res.status(200).json({
            success: true,
            status: 'DELETE',
            message: 'Delete product successfully!',
         })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})

export default router