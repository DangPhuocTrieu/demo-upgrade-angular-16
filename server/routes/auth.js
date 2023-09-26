import express from 'express'
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router()

// SIGNUP
router.post('/signup', async (req, res) => {
    try {
        const username = req.body.username
        const validUsername = await User.findOne({ username })

        if(validUsername) {
            return res.status(400).json({
                success: false,
                message: 'Username already exists.'
            })
        }
        
        const hashPassword = await argon2.hash(req.body.password)
        const newUser = new User({ username, password: hashPassword })
        const savedUser = await newUser.save()

        const { password, ...others } = savedUser._doc
        res.status(200).json({
            success: true, 
            message: 'Sign up successfully', 
            data: others
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})


// LOGIN
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })

        if(!user) {
            return res.status(403).json({
                success: false, 
                message: 'Incorrect username', 
            })
        }

        const userValid = await argon2.verify(user.password, req.body.password)

        if(!userValid)(
            res.status(403).json({
                success: false, 
                message: 'Incorrect password', 
            })
        )
        else {
            const accessToken = jwt.sign( 
                { id: user._id, isAdmin: user.isAdmin }, 
                process.env.ACCESS_TOKEN_SECRET
            )
    
            const { password, __v, ...others } = user._doc
    
            res.status(200).json({ 
                success: true, 
                message: 'Login successfully!', 
                data: { ...others, accessToken }
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})


export default router