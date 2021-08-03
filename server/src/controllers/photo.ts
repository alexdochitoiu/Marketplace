import { Request, Response } from "express";
import fs from "fs";
import { HOST } from "../config";

const url = `${HOST}/public/images/`;

const getAll = async (req: Request, res: Response) => {
  try {
    fs.readdir("public/images/", (err, files) => {
      const result = files.map((name) => ({ name, src: url + name }));
      res.status(200).json({ images: result });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const uploadImages = async (req: Request, res: Response) => {
  try {
    const images = req.files
      ? (req.files as Express.Multer.File[]).map((f) => f.filename)
      : [];
    const result = images.map((name) => ({ name, src: url + name }));
    res.status(200).json({ images: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteImages = async (req: Request, res: Response) => {
  const { images }: { images: string[] } = req.body;
  try {
    images.map((i) => {
      fs.unlink("public/images/" + i, (err) => {
        if (!err) {
          console.log(`Image ${i} deleted!`);
        }
      });
    });
    res.status(200).json({ images });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default {
  getAll,
  uploadImages,
  deleteImages,
};
