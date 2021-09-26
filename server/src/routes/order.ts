import express from "express";
import controller from "../controllers/order";

const router = express.Router();

router.get("/", controller.getOrders);
router.get("/:id", controller.getOrder);
router.post("/create", controller.createOrder);

export = router;
