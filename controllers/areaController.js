import Area from "../models/Area.js";

export const addArea = async (req, res) => {
  try {
    const newArea = new Area(req.body);
    await newArea.save();
    res.status(201).json(newArea);
  } catch (err) {
    res
      .status(500)
      .json({ message: "خطأ في إضافة المنطقة", error: err.message });
  }
};

export const getAreas = async (req, res) => {
  try {
    const areas = await Area.find();
    res.status(200).json(areas);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const deleteArea = async (req, res) => {
  try {
    await Area.findByIdAndDelete(req.params.id);
    res.status(200).json("تم حذف المنطقة");
  } catch (err) {
    res.status(500).json(err.message);
  }
};
