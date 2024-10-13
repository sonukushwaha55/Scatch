const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/product.model");
const userModel = require("../models/user.model");
const router = express.Router()



router.get("/", (req, res) => {
    const error = req.flash("error");
   let success = req.flash("success")

    res.render("index", { error, loggedin: false, success})
});


router.get("/shop", isLoggedIn,  async (req, res) => {
   let products = await productModel.find()
   let success = req.flash("success")

    res.render("shop", {products, success})
});

router.get("/cart", isLoggedIn,  async (req, res) => {
let user = await userModel.findOne({email: req.user.email}).populate("cart")
const error = req.flash("error");
if (!user || user.cart.length === 0) {
    res.send("Your cart is Empty ")

  }
let bill = (user.cart[0].price+20) - user.cart[0].discount
    res.render("cart", {user, bill, error})
});

router.get("/addtocart/:productid", isLoggedIn,  async (req, res) => {
  let user = await userModel.findOne({email: req.user.email})
  user.cart.push(req.params.productid);  
  await user.save();
  req.flash("success", "Added to cart")
  res.redirect("/shop")
});

router.get("/logout", isLoggedIn,   (req, res) => {
    res.render("shop")
})

module.exports = router
