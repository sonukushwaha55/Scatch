const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    fullname:{
        type: String,
        require: true,
        trim: true
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
   
    order:{
        type: Array,
        default: []
    },
    
    cart:[{
        type: mongoose.Schema.Types.ObjectId,    
        ref: "product"
    }],
    contacts:{
        type: Number,
        require: true
    },
    pictures: {
        type: String
    }
})

const userModel = mongoose.model("user", userSchema)
module.exports = userModel