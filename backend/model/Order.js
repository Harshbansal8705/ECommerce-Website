const { Schema, model, models } = require("mongoose");

const itemSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "product",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
})

const orderSchema = new Schema({
    items: {
        type: [itemSchema],
        required: true,
        validate: {
            validator: function (v) {
                return v.length > 0;
            },
            message: 'The items array must have a length greater than 0.',
        }
    },
    paymentMethod: { type: String, enum: ["cash", "card"], required: true },
    status: { type: String, required: true, default: "pending"},
    selectedAddress: { type: [Schema.Types.Mixed], required: true },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user"
    }
}, {
    timestamps: true,
    virtuals: {
        totalItems: {
            get() {
                return this.items.reduce((a, b) => a + b.quantity, 0)
            }
        },
        totalPrice: {
            get() {
                return this.items.reduce((a, b) => a + b.product.price, 0)
            }
        }
    }
})

exports.Order = models.order || model("order", orderSchema)