import express from "express";
import controller from "../controllers/order";
// import checkAuth from "../middleware/auth-check";

const router = express.Router();

router.get("/", /* checkAuth, */ controller.getOrders);
router.post("/create", controller.createOrder);

export = router;
