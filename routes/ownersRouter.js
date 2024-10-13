const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner.model");
const bcrypt = require("bcrypt"); // Assuming you're using bcrypt for password hashing
const isLoggedIn = require("../middlewares/isLoggedIn")

// Route to create a new owner
router.post("/create", async (req, res) => {
    try {
        // Check if there are existing owners
        const owners = await ownerModel.find();
        if (owners.length > 0) {
            return res.status(403).send("You don't have permission to create a new Owner");
        }

        const { fullname, email, password } = req.body;

        // Validate the input
        if (!fullname || !email || !password) {
            return res.status(400).send("All fields (fullname, email, password) are required");
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new owner
        const createdOwner = await ownerModel.create({
            fullname,
            email,
            password: hashedPassword,
        });

        res.status(201).send(createdOwner);
    } catch (error) {
        console.error("Error creating owner:", error);
        res.status(500).send("Internal server error");
    }
});

router.get("/admin", isLoggedIn, (req, res) => {
    let success = req.flash("success")
    res.render("createproducts", {success});
});

module.exports = router;
