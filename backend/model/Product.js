const { Schema, model, models } = require("mongoose")

const productSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: {
        type: Number,
        required: true,
        min: [0, "Minimum price should be greater than or equal to zero"]
    },
    discountPercentage: {
        type: Number,
        required: true,
        min: [1, "Invalid value of Discount"],
        max: [100, "Invalid value of Discount"]
    },
    rating: {
        type: Number,
        required: true,
        min: [1, "Invalid value of Rating"],
        max: [5, "Invalid value of Rating"],
        default: 5
    },
    stock: { type: Number, min: [0, "The value of Stock can't be less than zero"] },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    thumbnail: { type: String, required: true },
    images: { type: [String], required: true },
    deleted: { type: Boolean, required: true, default: false }
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

// A different way, just like we use toJSON above
// productSchema.set("toObject", {
//     virtuals: true,
//     versionKey: false,
//     transform: (doc, ret) => {
//         delete ret._id;
//         return ret;
//     }
// })

exports.Product = models.product || model("product", productSchema)