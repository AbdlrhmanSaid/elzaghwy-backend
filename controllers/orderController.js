import Order from "../models/Order.js";
import Area from "../models/Area.js";

const generateOrderID = () => {
  const now = new Date();
  const timePart =
    now.getHours().toString().padStart(2, "0") +
    now.getMinutes().toString().padStart(2, "0") +
    now.getSeconds().toString().padStart(2, "0");
  const datePart =
    now.getDate().toString().padStart(2, "0") +
    (now.getMonth() + 1).toString().padStart(2, "0") +
    now.getFullYear().toString();
  return `${timePart}${datePart}`;
};

export const createOrder = async (req, res) => {
  try {
    const { items, area, customerName, phone, address } = req.body;

    const areaData = await Area.findOne({ name: area });
    if (!areaData)
      return res.status(400).json({ message: "المنطقة غير موجودة" });
    const deliveryPrice = areaData.deliveryPrice;

    let subTotal = 0;
    items.forEach((item) => {
      subTotal += item.price * item.quantity;
    });

    const orderNumber = generateOrderID();

    const newOrder = new Order({
      orderNumber,
      customerName,
      phone,
      area,
      address,
      deliveryPrice,
      items,
      subTotal,
      totalAmount: subTotal + deliveryPrice,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({
      message: "تم تسجيل طلبك بنجاح",
      orderNumber: savedOrder.orderNumber,
    });
  } catch (err) {
    res.status(500).json({ message: "خطأ في تنفيذ الطلب", error: err.message });
  }
};

export const trackOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ orderNumber: req.params.orderNumber });
    if (!order) return res.status(404).json({ message: "الطلب غير موجود" });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const updatedOrder = await Order.findOneAndUpdate(
      { orderNumber: req.params.orderNumber },
      { status: req.body.status },
      { new: true },
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
