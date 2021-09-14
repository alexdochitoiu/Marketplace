import express from "express";
import controller from "../controllers/category";
import upload from "../middleware/image-upload";
import checkAuth from "../middleware/auth-check";

const router = express.Router();

router.get("/", controller.getAllCategories);
router.get("/:id", controller.getCategory);
router.get("/section/:sectionType", controller.getCategoriesBySection);
router.post(
  "/create",
  checkAuth,
  upload.single("image"),
  controller.createCategory
);
router.put(
  "/update/:id",
  checkAuth,
  upload.single("image"),
  controller.updateCategory
);
router.delete("/delete/:id", checkAuth, controller.deleteCategory);

export = router;
