import { Request, Response } from "express";
import { HOST } from "../config";
import log from "../logger";
import Product, { ProductDocument } from "../models/product";

const url = `${HOST}/public/images/`;

interface IErrorResponse {
  error: string;
}

type ResponseType<T> = T | IErrorResponse;

const createProduct = async (
  req: Request,
  res: Response<ResponseType<ProductDocument>>
) => {
  const {
    title,
    productCode,
    description,
    images: imagesAsUrl,
    category,
    sizeType,
    sizes,
    color,
    active,
  } = req.body;

  const imageNames = req.files
    ? (req.files as Express.Multer.File[]).map((f) => url + f.filename)
    : [];

  const images = imageNames.length > 0 ? imageNames : imagesAsUrl;
  Product.create({
    title,
    productCode,
    description,
    category,
    images,
    sizeType,
    sizes: JSON.parse(sizes),
    color,
    active,
  })
    .then((response) => {
      Product.findById(response._id)
        .populate("category")
        .then((product) => res.status(201).json(product!));
    })
    .catch((error) => {
      log.error(error);
      res.status(500).json({ error });
    });
};

const getProduct = (
  req: Request,
  res: Response<ResponseType<ProductDocument>>
) => {
  const { id } = req.params;
  Product.findById(id)
    .populate("category")
    .then((product) => {
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(400).json({ error: "Product not found" });
      }
    })
    .catch((error) => {
      log.error(error);
      res.status(500).json({ error });
    });
};

const getAllProducts = (req: Request, res: Response) => {
  Product.find()
    .populate("category")
    .then(async (products) => res.status(200).json(products))
    .catch((error) => {
      log.error(error);
      res.status(500).json({ error });
    });
};

const updateProduct = (
  req: Request,
  res: Response<ResponseType<ProductDocument>>
) => {
  const { id } = req.params;
  const {
    title,
    productCode,
    description,
    images: imagesAsUrl,
    category,
    sizeType,
    sizes,
    color,
    active,
  } = req.body;

  const imageNames = req.files
    ? (req.files as Express.Multer.File[]).map((f) => url + f.filename)
    : [];

  const images = [...imageNames, imagesAsUrl].flat().filter((i) => i);
  Product.findByIdAndUpdate(
    id,
    {
      title,
      productCode,
      description,
      category,
      images,
      sizeType,
      sizes: JSON.parse(sizes),
      color,
      active,
    },
    { new: true }
  )
    .populate("category")
    .then((product) => {
      if (!product) {
        res.status(404).json({ error: "Product not found" });
      } else {
        res.status(200).json(product);
      }
    })
    .catch((error) => {
      log.error(error);
      res.status(500).json({ error });
    });
};

const deleteProduct = (
  req: Request,
  res: Response<ResponseType<ProductDocument>>
) => {
  const { id } = req.params;
  Product.findByIdAndDelete(id)
    .then((product) => {
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(400).json({ error: "Product not found" });
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
