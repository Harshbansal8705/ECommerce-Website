const { Schema, models, model } = require("mongoose");

const cartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
    product: { type: Schema.Types.ObjectId, ref: "product", required: true },
    quantity: { type: Number, required: true }
}, {
    virtuals: {
        id: {
            get() {
                return this._id
            }
        },
    },
    toJSON: {
        virtuals: true,
        versionKey: false,
        transform: (doc, ret) => {
            delete ret._id;
            return ret;
        }
    },
    toObject: {
        virtuals: true,
        versionKey: false,
        transform: (doc, ret) => {
            delete ret._id;
            return ret;
        }
    }
})

exports.Cart = models.cart || model("cart", cartSchema)