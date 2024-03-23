const { Schema, models, model } = require("mongoose");

const categorySchema = new Schema({
    category: {
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

exports.Category = models.category || model("category", categorySchema)