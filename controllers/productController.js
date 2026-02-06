import Product from "../models/Product.js";

export const addProduct = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "يرجى رفع صورة المنتج" });
    }

    const { name, price, unit, inStock } = req.body;

    const newProduct = new Product({
      name,
      price,
      unit,
      inStock,
      image: req.file.path,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res
      .status(500)
      .json({ message: "خطأ في إضافة المنتج", error: err.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    res
      .status(500)
      .json({ message: "خطأ في جلب البيانات", error: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    let updateData = { ...req.body };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true },
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: "خطأ في التعديل", error: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("تم حذف المنتج بنجاح");
  } catch (err) {
    res.status(500).json({ message: "خطأ في الحذف", error: err.message });
  }
};
