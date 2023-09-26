import express from 'express'
import User from '../models/User.js'

const router = express.Router()

// LOGIN
router.get('/', async (req, res) => {
    try {
        let users = await User.find()

        res.status(200).json({ 
            success: true, 
            message: 'Get all users successfully!', 
            data: users
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})


export default router