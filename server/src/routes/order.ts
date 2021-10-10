import express from "express";
import controller from "../controllers/order";
import checkAuth from "../middleware/auth-check";

const router = express.Router();

router.get("/", controller.getOrders);
router.get("/:id", controller.getOrder);
router.post("/create", controller.createOrder);
router.put("/update/:id", checkAuth, controller.updateOrder);
router.delete("/delete/:id", checkAuth, controller.deleteOrder);

export = router;
