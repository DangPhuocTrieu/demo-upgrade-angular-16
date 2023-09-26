import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    discount: {
        type: Number
    },
    price: {
        type: Number,
        requried: true
    },
    images: {
        image_1: {
            type: String,
            required: true
        },
        image_2: {
            type: String,
            required: true
        },
        image_3: {
            type: String,
            required: true
        },
    },
    reviews: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            rating: {
                type: Number, 
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ]
})

const Product = mongoose.model('Product', productSchema)

export default Product