import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, callback) => callback(null, "public/invoices"),
  filename: (req, file, callback) =>
    callback(null, `invoice_${new Date().getTime()}`),
});

const upload = multer({
  storage,
});

export default upload;
