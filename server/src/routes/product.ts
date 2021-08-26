import express from "express";
import controller from "../controllers/product";
import upload from "../middleware/image-upload";
import checkAuth from "../middleware/auth-check";

const router = express.Router();

router.get("/", controller.getAllProducts);
router.get("/:id", controller.getProduct);
router.get("/product-code/:productCode", controller.getProductsByProductCode);
router.post(
  "/create",
  checkAuth,
  upload.array("images", 4),
  controller.createProduct
);
router.put(
  "/update/:id",
  checkAuth,
  upload.array("images", 4),
  controller.updateProduct
);
router.delete("/delete/:id", checkAuth, controller.deleteProduct);

export = router;
