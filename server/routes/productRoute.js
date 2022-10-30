const Product = require("../models/ProductSchema");

const router = require("express").Router();

// create product
router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(200).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get all products
router.get("/", async (req, res) => {
  try {
    const limitNumber = req.query.limit;
    const products = await Product.find()
      .limit(limitNumber)
      .sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//get category with image
router.get("/category", async (req, res) => {
  try {
    const categories = await Product.aggregate([
      {
        $project: {
          slug: 1,
          firstImage: { $arrayElemAt: ["$images", 0] },
        },
      },
    ]);
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//filter same category
router.get("/categories/:slug", async (req, res) => {
  try {
    const slug = req.params.slug;
    const category = await Product.find({ slug });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// search product
router.get("/search", async (req, res) => {
  try {
    const searchQuery = req.query.search;
    const queryFilter = {
      $or: [
        {
          slug: {
            $regex: searchQuery,
            $options: "i",
          },
        },
        {
          subCategory: {
            $regex: searchQuery,
            $options: "i",
          },
        },
        {
          category: {
            $regex: searchQuery,
            $options: "i",
          },
        },
        {
          productName: {
            $regex: searchQuery,
            $options: "i",
          },
        },
      ],
    };
    const product = await Product.find(queryFilter);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
