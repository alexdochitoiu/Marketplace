import { Request, Response } from "express";
import { HOST } from "../config";
import log from "../logger";
import Category from "../models/category";

const url = `${HOST}/public/images/`;

const createCategory = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const imageName = req.file?.filename;
  const alreadyExists = Boolean(await Category.findOne({ title }));
  if (alreadyExists) {
    res.status(400).json({ message: "Category already exists" });
  } else {
    Category.create({
      title,
      description,
      image: imageName && url + imageName,
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

const getCategory = (req: Request, res: Response) => {
  const { id } = req.params;
  Category.findById(id)
    .then((category) => {
      if (category) {
        res.status(200).json(category);
      } else {
        res.status(400).json({ message: "Category not found" });
      }
    })
    .catch((error) => {
      log.error(error);
      res.status(500).json({ error });
    });
};

const getAllCategories = (req: Request, res: Response) => {
  Category.find()
    .then((categories) => res.status(200).json({ categories }))
    .catch((error) => {
      log.error(error);
      res.status(500).json({ error });
    });
};

const updateCategory = (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const imageName = req.file?.filename;
  Category.findByIdAndUpdate(id, {
    title,
    description,
    image: url + imageName,
  })
    .then((category) => {
      res.status(200).json(category);
    })
    .catch((error) => {
      log.error(error);
      res.status(500).json({ error });
    });
};

const deleteCategory = (req: Request, res: Response) => {
  const { id } = req.params;
  Category.findByIdAndDelete(id)
    .then((category) => {
      if (category) {
        res.status(200).json(category);
      } else {
        res.status(400).json({ message: "Category not found" });
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
