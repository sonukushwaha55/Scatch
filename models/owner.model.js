const mongoose = require("mongoose")

const ownerSchema = mongoose.Schema({
    fullname:{
        type: String,
        require: true,
        trim: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true
    },
    
})

const ownerModel = mongoose.model("owner", ownerSchema)
module.exports = ownerModel