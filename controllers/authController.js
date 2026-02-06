import User from "../models/User.js"; // لاحظ إضافة .js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createFirstAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new User({ username, password: hashedPassword });
    await admin.save();

    res.status(201).send("Admin created successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.json({ token });
    } else {
      res.status(401).send("بيانات الدخول غير صحيحة");
    }
  } catch (err) {
    res.status(500).send("خطأ في الخادم");
  }
};
