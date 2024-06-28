const express = require("express")
const mongoose = require("mongoose");
const cors = require("cors");
const { login, createUser, addAddress, fetchUserDetails } = require("../controller/user");
const { cartRouter } = require("../controller/cart");
const { Cart } = require("../model/Cart");
const { createOrder, getOrders } = require("../controller/order");
const authenticateToken = require("../middlewares/auth");
const { getProducts, getProductById, createProduct } = require("../controller/product");
require("dotenv").config()

const app = express();

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Connected to Mongoose");
}).catch(() => {
    console.log("Error connecting Mongoose");
})

app.use(cors({
    exposedHeaders: ["X-Total-Count"]
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post("/login", login)
app.get("/users", authenticateToken, fetchUserDetails)
app.post("/users", createUser)
app.patch("/users", authenticateToken, addAddress)

app.get("/products", getProducts)
app.get("/products/:productId", getProductById)
app.post("/products", createProduct)

app.use("/cart", authenticateToken, cartRouter)

app.post("/productInCart", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId
        const data = await Cart.findOne({ user: userId, product: req.body.productId }).lean().exec()
        return res.status(200).json({ success: true, data: data ? true : false })
    } catch {
        return res.status(400).json({ success: false })
    }
})

app.get("/orders", authenticateToken, getOrders)
app.post("/orders", authenticateToken, createOrder)

app.listen(8000, () => {
    console.log("Listening on port 8000")
    console.log("connecting to mongoose...")
})

module.exports = app;