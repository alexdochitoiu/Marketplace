import express from "express";
import controller from "../controllers/photo";
import upload from "../middleware/image-upload";
import checkAuth from "../middleware/auth-check";

const router = express.Router();

router.get("/", controller.getAll);
router.post(
  "/upload",
  checkAuth,
  upload.array("images"),
  controller.uploadImages
);

export = router;
