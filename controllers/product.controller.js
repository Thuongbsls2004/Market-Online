const Product = require("../models/product.model");

module.exports = {
    getAllProduct: async (req, res) => {
        const products = await Product.find();

        return res.status(200).json({
            success: true,
            data: {
                products,
            },
        });
    },

    createProduct: async (req, res) => {
        const data = req.body;

        const product = await Product.create({
            ...data,
        });

        return res.status(201).json({
            success: true,
            data: {
                product,
            },
        });
    },

    updateProduct: async (req, res) => {
        const { id } = req.params;
        const data = req.body;

        let product = await Product.find((product) => product.id === +id);
        product = {
            ...product,
            ...data,
        };

        return res.json({
            success: true, 
            data: {
                product,
            },
        });
    },

    deleteProduct: async (req, res) => {
        const { id } = req.params;
        const index = await products.findIndex((product) => product.id === +id);

        users.splice(index, 1);

        return res.json({
            success: true, 
            data: {
                product,
            },
        });
    },

    searchByName: async (req, res) => {
        const name = req.params.name;
        const products = await Product.find({ name: { $regex: name, $options: 'i' } });
        res.render('products', { products });
      },
      
      
    searchByCategoryAndName: async (req, res) => {
        const category = req.params.category;
        const name = req.params.name;
        const products = await Product.find({ category, name: { $regex: name, $options: 'i' } });
        res.render('products', { products });
      },
      
      searchByCategoryAndNameAndPriceRange: async (req, res) => {
        const category = req.params.category;
        const name = req.params.name;
        const minPrice = parseInt(req.params.min);
        const maxPrice = parseInt(req.params.max);
        const products = await Product.find({
          category,
          name: { $regex: name, $options: 'i' },
          price: { $gte: minPrice, $lte: maxPrice }
        });
        res.render('products', { products });
      }

};


