const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const { generatedToken } = require("../utils/generatedToken")
const ProductModel = require("../models/product.model")

module.exports.registerUser = async (req, res) =>{
    try {
        let { fullname, email, password } = req.body
        let user = await userModel.findOne({email})
        if(user){
            req.flash("error", "You already have an account, Please Login")
            return res.redirect("/")
        }

    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(password, salt, async function(err, hash){
           if(err) return res.send(err.message)
            else {
                const user = await userModel.create({
                    fullname,
                    email,
                    password: hash,
                
                });
                let token = generatedToken(user)
                res.cookie("token", token)
              res.redirect("/shop")
                
        }
        })
    })
    
    
    } catch (error) {
        res.send(error.message);
        
    }
    
    }

    module.exports.loginUser = async (req, res) =>{
        let {email, password} = req.body;

        let user = await userModel.findOne({email: email})
        if(!user) {
            req.flash("error", "Email or password is incorrect")
           res.redirect("/")
        }

            bcrypt.compare(password, user.password, async function(err, result){
                if(result){
                    let token = generatedToken(user)
                    res.cookie("token", token)
                    res.redirect("/shop")

                    const products = await ProductModel.find(); 
                    console.log("Products data:", products); 
        
                    res.render("shop", { products: products || [] });


                }
                else{
                    req.flash("error", "Email or password is incorrect")
                    return res.redirect("/")
                }
            });
    }

    module.exports.logout = function (req, res) {
         res.cookie("token", "")
         req.flash("success", "You have logout successfully")
         res.redirect("/");
    }