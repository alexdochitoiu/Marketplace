import { Request, Response } from "express";
import { HOST } from "../config";
import log from "../logger";
import Category, { CategoryDocument, SectionType } from "../models/category";
import Product from "../models/product";

const url = `${HOST}/public/images/`;

interface IErrorResponse {
  error: string;
}

type ResponseType<T> = T | IErrorResponse;

const createCategory = async (
  req: Request,
  res: Response<ResponseType<CategoryDocument>>
) => {
  const { title, description, image: imageAsUrl, section } = req.body;
  const imageName = req.file?.filename;
  const alreadyExists = Boolean(await Category.findOne({ title }));
  if (alreadyExists) {
    res.status(400).json({ error: "Category already exists" });
  } else {
    const image = imageName ? url + imageName : imageAsUrl;
    Category.create({
      title,
      section,
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

interface ICategoryResult {
  _id: string;
  title: string;
  description?: string;
  image?: string;
  productsCount: number;
}

const getAllCategories = async (
  req: Request,
  res: Response<ResponseType<ICategoryResult[]>>
) => {
  const noCategoryProductsCount = await Product.find({
    category: null,
  })
    .countDocuments()
    .exec();
  Category.find()
    .exec()
    .then((categories) => {
      const pResult = Promise.all(
        categories.map(async (c) => {
          const productsCount = await Product.find({
            category: { _id: c._id },
          })
            .countDocuments()
            .exec();
          return {
            // @ts-ignore
            ...c._doc,
            productsCount,
          } as ICategoryResult;
        })
      );
      pResult.then((result) =>
        res.status(200).json([
          ...result,
          {
            _id: "alte-produse",
            title: "Alte produse",
            productsCount: noCategoryProductsCount,
          },
        ])
      );
    })
    .catch((error) => {
      log.error(error);
      res.status(500).json({ error });
    });
};

const getCategoriesBySection = (
  req: Request,
  res: Response<ResponseType<CategoryDocument[]>>
) => {
  const section = req.params.sectionType as SectionType;
  Category.find({ section })
    .exec()
    .then((categories) => {
      res.status(200).json(categories);
    })
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
  const { title, description, image: imageAsUrl, section } = req.body;
  const imageName = req.file?.filename;
  const image = imageName ? url + imageName : imageAsUrl;
  Category.findByIdAndUpdate(
    id,
    {
      title,
      section,
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
  getCategoriesBySection,
  updateCategory,
  deleteCategory,
};
