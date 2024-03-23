const { Router } = require("express")
const { Cart } = require("../model/Cart")

const cartRouter = Router()

cartRouter.get("/", async (req, res) => {
    const user = req.user.userId
    console.log(user)
    return await Cart.find({ user: user }).populate("product").then(data => res.status(200).json({ success: true, data })).catch(err => res.status(400).json({ success: false, error: err }))
})

cartRouter.post("/", async (req, res) => {
    const cartItem = new Cart(req.body)
    await cartItem.save().catch(err => res.status(400).json({ success: false, err }))
    return Cart.find({ user: req.body.user }).lean().exec().then(data => res.status(200).json({ success: true, data })).catch(error => res.status(400).json({ success: false, message: "Some error occured", error }))
})

cartRouter.patch("/", async (req, res) => {
    if (req.body.newData.quantity <= 0) await Cart.findByIdAndDelete(req.body.item).exec()
    else await Cart.findByIdAndUpdate(req.body.item, req.body.newData, {new: true}).exec()
    return await Cart.find({ user: req.user.userId }).populate("product").then(data => res.status(200).json({ success: true, data })).catch(err => res.status(400).json({ success: false, error: err }))
})

cartRouter.delete("/", async (req, res) => {
    await Cart.findByIdAndDelete(req.body.cartItem).exec()
    return await Cart.find({ user: req.user.userId }).populate("product").exec().then(data => res.status(200).json({ success: true, data })).catch(err => res.status(400).json({ success: false, error: err }))
})

exports.cartRouter = cartRouter