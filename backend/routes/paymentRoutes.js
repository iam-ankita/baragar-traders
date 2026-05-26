const express = require("express");
const router = express.Router();
const paymentController = require("../controller/paymentController");

// Get payment configuration
router.get("/config", paymentController.getPaymentConfig);

// eSewa routes
router.post("/esewa/initialize", paymentController.initializeEsewa);
router.post("/esewa/verify", paymentController.verifyEsewa);

// Khalti routes
router.post("/khalti/initialize", paymentController.initializeKhalti);
router.post("/khalti/verify", paymentController.verifyKhalti);

// Cash on Delivery
router.post("/cod/process", paymentController.processCOD);

module.exports = router;
