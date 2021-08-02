import multer, { FileFilterCallback } from "multer";
import { Request } from "express";

const storage = multer.diskStorage({
  destination: (req, file, callback) => callback(null, "public/images"),
  filename: (req, file, callback) =>
    callback(
      null,
      new Date().getTime() + file.originalname.toLocaleLowerCase()
    ),
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

export default upload;
