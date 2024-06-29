const { default: mongoose } = require("mongoose");
require("dotenv").config();

async function dbgenerate() {
    let products = await fetch("https://dummyjson.com/products?limit=1000").then(res => res.json());
    products = products.products.filter(product => product.category && product.brand && product.images.length >= 3);
    products = products.map(product => ({
        title: product.title,
        description: product.description,
        price: product.price,
        discountPercentage: product.discountPercentage,
        rating: product.rating,
        stock: product.stock,
        brand: product.brand.split("-").join(" ").replaceAll("&", "and"),
        category: product.category[0].toUpperCase() + product.category.slice(1).split("-").join(" ").replaceAll("&", "and"),
        thumbnail: product.thumbnail,
        images: product.images,
        deleted: false
    }));
    brands = [...new Set(products.map(product => product.brand))];
    categories = [...new Set(products.map(product => product.category))];
    brands = brands.map(brand => ({ brand }));
    categories = categories.map(category => ({ category }));
    
    return { products, brands, categories };
}

dbgenerate().then(async ({products, categories, brands}) => {
    await mongoose.connect(process.env.MONGODB_URI);
    await mongoose.connection.dropCollection("products");
    await mongoose.connection.dropCollection("categories");
    await mongoose.connection.dropCollection("brands");
    await mongoose.connection.collection("products").insertMany(products);
    await mongoose.connection.collection("categories").insertMany(categories);
    await mongoose.connection.collection("brands").insertMany(brands);
    console.log("Database regenerated");
});