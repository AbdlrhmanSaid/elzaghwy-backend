import Offer from "../models/Offer.js";

// إضافة عرض جديد (أدمن فقط)
export const addOffer = async (req, res) => {
  try {
    const imageUrl = req.file ? req.file.path : "";
    const { title, description, price, includedItems } = req.body;

    const parsedItems =
      typeof includedItems === "string"
        ? JSON.parse(includedItems)
        : includedItems;

    const newOffer = new Offer({
      title,
      description,
      price,
      image: imageUrl,
      includedItems: parsedItems,
    });

    await newOffer.save();
    res.status(201).json(newOffer);
  } catch (err) {
    res.status(500).json({ message: "خطأ في إضافة العرض", error: err.message });
  }
};

export const getOffers = async (req, res) => {
  try {
    const offers = await Offer.find({ isActive: true }).sort({ createdAt: -1 });
    res.status(200).json(offers);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const deleteOffer = async (req, res) => {
  try {
    await Offer.findByIdAndDelete(req.params.id);
    res.status(200).json("تم حذف العرض");
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const updateOffer = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, includedItems, isActive } = req.body;

    let parsedItems;
    if (includedItems) {
      parsedItems =
        typeof includedItems === "string"
          ? JSON.parse(includedItems)
          : includedItems;
    }

    const updateData = {
      title,
      description,
      price,
      isActive,
      ...(parsedItems && { includedItems: parsedItems }),
    };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const updatedOffer = await Offer.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true },
    );

    if (!updatedOffer) {
      return res.status(404).json({ message: "العرض غير موجود" });
    }

    res.status(200).json(updatedOffer);
  } catch (err) {
    res.status(500).json({ message: "خطأ في تحديث العرض", error: err.message });
  }
};
