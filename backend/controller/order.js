const { Cart } = require("../model/Cart")
const { Order } = require("../model/Order")

exports.createOrder = (req, res) => {
    const order = new Order(req.body)
    order.save().then(async data => {
        await Cart.deleteMany({user: req.body.user}).exec();
        return res.status(201).json({ data })
    }).catch(e => res.status(400).json({ success: false, error: e }))
}

exports.getOrders = async (req, res) => {
    const orders = await Order.findOne({user: req.query.user})
    return res.status(200).json({ success: true, data: orders })
}

exports.updateOrder = (req, res) => {
    Order.findByIdAndUpdate(req.query.id, req.body, {new: true}).then(data => res.status(200).json({success: true, data: data})).catch(e => res.status(400).json({ success: false, error: e }))
}