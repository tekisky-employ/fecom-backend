import orderModel from "../models/orderModel.js";
import userModel from "../models/userSchema.js";

export const createOrder = async (req, res) => {
  try {
    const { cart } = req.body;
    console.log("REQ.USER 👉", req.user);

    const user = await userModel.findById(req.user);
    console.log(user);

    if (!user) return res.status(400).json({ msg: "User not found" });

    // total calculate
    const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const newOrder = new orderModel({
      user: req.user,
      cart,
      total,
    });

    await newOrder.save();

    await userModel.findByIdAndUpdate(user._id, { cart: [] });

    res.json({ msg: "Order placed successfully" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ user: req.user })
      .populate("user", "name email");

    res.json(orders);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

// ADMIN ALL ORDERS
export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find().populate("user", "name email");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ADMIN UPDATE STATUS
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    await orderModel.findByIdAndUpdate(req.params.id, { status });

    res.json({ msg: "Order status updated" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
