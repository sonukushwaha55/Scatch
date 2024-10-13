const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const path = require("path");
const connectDB = require("./config/mongoose.connection");
const dotenv = require("dotenv");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");
const ownersRouter = require("./routes/ownersRouter");
const indexRouter = require("./routes/index")
const expressSession = require("express-session")
const flash = require("connect-flash")

dotenv.config();

// Connect to the database first before starting the server
connectDB().then(() => {
    // Middleware setup
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, "public")));
    app.use(cookieParser());
    app.set("view engine", "ejs");
    app.use(expressSession({
        resave: false,
        saveUninitialized: true,
        secret: process.env.EXPRESS_SESSION_SECRET,
      })
    );
    app.use(flash());

    // Routes setup
    app.use("/", indexRouter )
    app.use("/owners", ownersRouter);
    app.use("/users", usersRouter);
    app.use("/products", productsRouter);

    // Start the server only after the database connection is successful
    app.listen(3000, () => {
        console.log("Server is running at port: 3000");
    });
}).catch((error) => {
    console.error("Failed to connect to the database:", error.message);
    process.exit(1); // Exit the process if the database connection fails
});