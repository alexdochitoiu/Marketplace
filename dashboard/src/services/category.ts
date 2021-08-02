import axios from "axios";
import {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  GET_CATEGORIES,
} from "src/constants/endpoints";
import ICategory from "src/types/ICategory";
import { getToken } from "./auth";

const getAll = async () =>
  axios.get<{ categories: ICategory[] }>(GET_CATEGORIES);

const create = async (data: FormData) =>
  axios.post<ICategory>(CREATE_CATEGORY, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getToken()}`,
    },
  });

// const update = async () =>

const remove = async (id: string) =>
  axios.delete(DELETE_CATEGORY.replace(":id", id), {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export {
  getAll,
  create,
  // update,
  remove,
};
