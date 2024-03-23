const { Schema, models, model } = require("mongoose");

const brandSchema = new Schema({
    brand: {
        type: String,
        required: true,
        unique: true
    }
}, {
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

exports.Brand = models.brand || model("brand", brandSchema)