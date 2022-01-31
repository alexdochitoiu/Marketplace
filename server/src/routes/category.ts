import express from "express";
import controller from "../controllers/category";
import upload from "../middleware/image-upload";
import checkAuth from "../middleware/auth-check";
import previewController from "../controllers/previewCategory";

const router = express.Router();

router.get("/", controller.getAllCategories);
router.get("/:id", controller.getCategory);
router.get("/section/:sectionType", controller.getCategoriesBySection);
router.get("/all/active", controller.getAllActiveCategories);
router.get("/all/preview", previewController.getAll);
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
