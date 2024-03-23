const { Schema, models, model } = require("mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "This email is already registered"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false
    },
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    role: {
        type: String,
        required: true,
        enum: ["user", "admin"],
        default: "user"
    },
    addresses: {
        type: [Schema.Types.Mixed],
        default: []
    }
}, {
    virtuals: {
        id: {
            get() {
                return this._id
            }
        }
    },
    toObject: {
        virtuals: true,
        versionKey: false,
        transform: (doc, ret) => {
            delete ret._id
            return ret
        }
    },
    toJSON: {
        virtuals: true,
        versionKey: false,
        transform: (doc, ret) => {
            delete ret._id
            return ret
        }
    }
})

exports.User = models.user || model("user", userSchema)