import axios from "axios";
import {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  GET_CATEGORIES,
  GET_CATEGORY,
  UPDATE_CATEGORY,
} from "src/constants/endpoints";
import ICategory from "src/types/ICategory";
import { getToken } from "./auth";

const getById = async (id: string) =>
  axios.get<ICategory>(GET_CATEGORY.replace(":id", id));

const getAll = async () => axios.get<ICategory[]>(GET_CATEGORIES);

const create = async (data: FormData) =>
  axios.post<ICategory>(CREATE_CATEGORY, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getToken()}`,
    },
  });

const update = async (id: string, data: FormData) =>
  axios.put<ICategory>(UPDATE_CATEGORY.replace(":id", id), data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getToken()}`,
    },
  });

const remove = async (id: string) =>
  axios.delete<ICategory>(DELETE_CATEGORY.replace(":id", id), {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export { getById, getAll, create, update, remove };
