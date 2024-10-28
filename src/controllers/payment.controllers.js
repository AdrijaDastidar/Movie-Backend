import { instance } from '../models/Payment.api.js';

export const checkout = async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100,
      currency: 'INR',
    };
    const order = await instance.orders.create(options);
    res.status(200).json({ data: { order } });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Failed to create order", error: error.message });
  }
};

export const paymentVerification = async (req, res) => {

    res.redirect(`http://localhost:5173/paymentSuccess`)
  res.status(200).json({ message: "Payment successful" });
};
