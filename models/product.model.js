const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    image:{
        type: Buffer,
    },
    name:{
        type: String,
    },
    price:{
        type: Number,
    },
    discount:{
        type: Number,
        default: 0
    },
    bgcolor:{
        type: String,
    },
    panelcolor:{
        type: String,
    },
    textcolor:{
        type: String,
    },

})

const productModel = mongoose.model("product", productSchema)
module.exports = productModel