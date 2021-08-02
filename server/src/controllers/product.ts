import { Request, Response } from "express";
import log from "../logger";
import Product from "../models/product";

const createProduct = async (req: Request, res: Response) => {
  const { title, description, category, price, promoPrice, quantity, sizes } =
    req.body;
  const images = req.files
    ? (req.files as Express.Multer.File[]).map((f) => f.path)
    : [];
  Product.create({
    title,
    description,
    category,
    images,
    price,
    promoPrice,
    quantity,
    sizes,
  })
    .then((product) => {
      res.status(201).json(product);
    })
    .catch((error) => {
      log.error(error);
      res.status(500).json({ error });
    });
};

const getProduct = (req: Request, res: Response) => {
  const { id } = req.params;
  Product.findById(id)
    .then((product) => {
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(400).json({ message: "Product not found" });
      }
    })
    .catch((error) => {
      log.error(error);
      res.status(500).json({ error });
    });
};

const getAllProducts = (req: Request, res: Response) => {
  Product.find()
    .then((products) => res.status(200).json(products))
    .catch((error) => {
      log.error(error);
      res.status(500).json({ error });
    });
};

const updateProduct = (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, category, price, promoPrice, quantity, sizes } =
    req.body;
  const images = req.files
    ? (req.files as Express.Multer.File[]).map((f) => f.path)
    : [];
  Product.findByIdAndUpdate(id, {
    title,
    description,
    category,
    images,
    price,
    promoPrice,
    quantity,
    sizes,
  })
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((error) => {
      log.error(error);
      res.status(500).json({ error });
    });
};

const deleteProduct = (req: Request, res: Response) => {
  const { id } = req.params;
  Product.findByIdAndDelete(id)
    .then((product) => {
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(400).json({ message: "Product not found" });
      }
    })
    .catch((error) => {
      log.error(error);
      res.status(500).json({ error });
    });
};

export default {
  createProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
