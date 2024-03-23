const { Brand } = require("../model/Brand");
const { Category } = require("../model/Category");
const { Product } = require("../model/Product");
const { Router } = require("express")

const productsRouter = Router();

exports.createProduct = (req, res) => {
    let product = req.body
    product = new Product(product)
    product.save()
        .then((doc) => res.status(201).json({ success: true, result: doc }))
        .catch((err) => res.status(400).json({ success: false, result: err }))
}

exports.getProducts = async (req, res) => {
    let page = req.query["page"] || 1
    let selectedBrands = req.query["brand"] ? req.query["brand"] : []
    let selectedCategories = req.query["category"] ? req.query["category"] : []
    let sort = req.query["sort"] ? req.query["sort"] : "popularity"
    let sortOptions;
    switch (sort) {
        case "popularity":
            sortOptions = { rating: -1 }
            break;
        case "price-low-to-high":
            sortOptions = { price: 1 }
            break;
        case "price-high-to-low":
            sortOptions = { price: -1 }
            break;
        default:
            break;
    }
    let brands = await Brand.find({}).lean().exec().then(brands => brands.map(brand => {
        if (selectedBrands.includes(brand.brand)) {
            return { brand: brand.brand, checked: true }
        } else {
            return { brand: brand.brand, checked: false }
        }
    }))
    let categories = await Category.find({}).lean().exec().then(categories => categories.map(category => {
        if (selectedCategories.includes(category.category)) {
            return { category: category.category, checked: true }
        } else {
            return { category: category.category, checked: false }
        }
    }))
    let products = await Product.find({
        brand: selectedBrands.length ? selectedBrands : brands.map(brand => brand.brand),
        category: selectedCategories.length ? selectedCategories : categories.map(category => category.category)
    })
    res.set("X-Total-Count", products.length)
    products = await Product.find({
        brand: selectedBrands.length ? selectedBrands : brands.map(brand => brand.brand),
        category: selectedCategories.length ? selectedCategories : categories.map(category => category.category)
    }).sort(sortOptions).skip((page - 1) * 10).limit(10).exec()
    res.status(200).json({ products, brands, categories, sort })
}

exports.getProductById = async (req, res) => {
    let product = await Product.findOne({ _id: req.params.productId }).exec()
    product ? res.status(200).json(product) : res.status(400).json("Couldn't find the Product ID")
}