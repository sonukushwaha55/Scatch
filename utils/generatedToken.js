const jwt = require("jsonwebtoken")

const generatedToken =  (user) =>{
 return jwt.sign({email: user.email, id: user._id}, process.env.JWT_KEY, { expiresIn: '1h' })

}
module.exports.generatedToken = generatedToken