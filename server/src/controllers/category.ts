import { Request, Response } from "express";
import { HOST } from "../config";
import log from "../logger";
import Category, { CategoryDocument } from "../models/category";

const url = `${HOST}/public/images/`;

interface IErrorResponse {
  error: string;
}

type ResponseType<T> = T | IErrorResponse;

const createCategory = async (
  req: Request,
  res: Response<ResponseType<CategoryDocument>>
) => {
  const { title, description, image: imageAsUrl } = req.body;
  const imageName = req.file?.filename;
  const alreadyExists = Boolean(await Category.findOne({ title }));
  if (alreadyExists) {
    res.status(400).json({ error: "Category already exists" });
  } else {
    const image = imageName ? url + imageName : imageAsUrl;
    Category.create({
      title,
      description,
      image,
    })
      .then((category) => {
        res.status(201).json(category);
      })
      .catch((error) => {
        log.error(error);
        res.status(500).json({ error });
      });
  }
};

const getCategory = (
  req: Request,
  res: Response<ResponseType<CategoryDocument>>
) => {
  const { id } = req.params;
  Category.findById(id)
    .then((category) => {
      if (category) {
        res.status(200).json(category);
      } else {
        res.status(400).json({ error: "Category not found" });
      }
    })
    .catch((error) => {
      log.error(error);
      res.status(500).json({ error });
    });
};

const getAllCategories = (
  req: Request,
  res: Response<ResponseType<CategoryDocument[]>>
) => {
  Category.find()
    .then((categories) => res.status(200).json(categories))
    .catch((error) => {
      log.error(error);
      res.status(500).json({ error });
    });
};

const updateCategory = (
  req: Request,
  res: Response<ResponseType<CategoryDocument>>
) => {
  const { id } = req.params;
  const { title, description, image: imageAsUrl } = req.body;
  const imageName = req.file?.filename;
  const image = imageName ? url + imageName : imageAsUrl;
  Category.findByIdAndUpdate(
    id,
    {
      title,
      description,
      image,
    },
    { new: true, omitUndefined: true }
  )
    .then((category) => {
      if (!category) {
        res.status(404).json({ error: "Category not found" });
      } else {
        res.status(200).json(category);
      }
    })
    .catch((error) => {
      log.error(error);
      res.status(500).json({ error });
    });
};

const deleteCategory = (
  req: Request,
  res: Response<ResponseType<CategoryDocument>>
) => {
  const { id } = req.params;
  Category.findByIdAndDelete(id)
    .then((category) => {
      if (category) {
        res.status(200).json(category);
      } else {
        res.status(400).json({ error: "Category not found" });
      }
    })
    .catch((error) => {
      log.error(error);
      res.status(500).json({ error });
    });
};

export default {
  createCategory,
  getCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
