const Razorpay = require("razorpay");
const express = require("express");
const router = express.Router();
const crypto = require("crypto");

const razorpayInstance = new Razorpay({
    key_id: "rzp_test_rxowtXdjKVLCPU",
    key_secret: "lDMYCwzvAQiLPzQEMFSxZNEA",
});

router.post("/createOrder", async (req, res) => {
        const amount = req.body.amount; // Amount will now come from the form
    if (!amount) {
        return res.status(400).json({ status: "error", message: "Amount is required." });
    }
    const finalAmount = amount * 100; // Convert to paisa

    const options = {
        amount: finalAmount,
        currency: "INR",
        receipt: "receipt_order_" + Date.now(),
    };

    try {
        const order = await razorpayInstance.orders.create(options);
        res.json(order);
    } catch (err) {
        console.error("Error creating Razorpay order:", err);
        res.status(500).json({ status: "error", message: "Something went wrong while creating order." }); // Send JSON error
    }
});

// 🔹 Corrected: Payment Verification Route
router.post("/paymentVerify", (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const generated_signature = crypto.createHmac('sha256', razorpayInstance.key_secret)
                                      .update(razorpay_order_id + "|" + razorpay_payment_id)
                                      .digest('hex');

    if (generated_signature === razorpay_signature) {
        console.log("Payment successful and signature verified!");
        // 🔹 IMPORTANT: Here you would update your database (e.g., mark order as paid, store payment details)
        // Now, send a JSON response to the client
        res.json({ status: "success", message: "Payment was successful!" });
    } else {
        console.log("Payment verification failed or signature mismatch!");
        // Send a JSON response to the client
        res.json({ status: "failure", message: "Payment failed or could not be verified." });
    }
});

module.exports = router;
