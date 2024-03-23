const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { User } = require("../model/User")

exports.createUser = async (req, res) => {
    console.log("creating user")
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return res.status(400).json({ success: false, message: err.message });
        bcrypt.hash(req.body.password, salt, async (err, hash) => {
            if (err) return res.status(400).json({ success: false, message: err.message });
            req.body.password = hash
            const user = new User(req.body)
            return await user.save().then(() => {
                const token = jwt.sign({
                    email: user.email,
                    userId: user.id
                }, "secretKey", { expiresIn: "30d" })
                return res.status(201).json({ token, user, success: true, message: "User created" })
            }).catch((e) => {
                if (e.name === "MongoServerError" && e.code === 11000) {
                    res.status(400).json({ success: false, message: "This email already exists" })
                } else {
                    res.status(400).json({ success: false, message: e.message })
                }
            })
        })
    })
}

exports.fetchUserDetails = async (req, res) => {
    let userId = req.user.userId
    return await User.findById(userId).exec().then(data => res.status(200).json({ success: true, data })).catch(err => ({ sucess: true, error: err }))
}

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email.toLowerCase() }).select("email +password").exec()
        if (!user) return res.status(400).json({ success: false, message: "User not found" });
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err || !result) {
                return res.status(401).json({ success: false, message: "Error logging in" })
            }
            const token = jwt.sign({
                email: user.email,
                userId: user.id
            }, "secretKey", { expiresIn: "30d" })
            return user ? res.status(200).json({ token, user, success: true, message: "Logged in Succcessfully" }) : res.status(400).json({ user: null, success: false, message: "Invalid Email or Password" })
        })
    } catch (e) {
        return res.status(400).json({ success: false, error: "Some error occured" })
    }
}

exports.addAddress = async (req, res) => {
    let userId = req.user.userId
    return await User.findByIdAndUpdate(userId, { $push: { addresses: req.body.address } }, { new: true }).then(data => res.status(200).json({ success: true, data })).catch(err => res.status(400).send({ success: false, error: err }))
}