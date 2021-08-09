import axios from "axios";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCT,
  GET_PRODUCTS,
  UPDATE_PRODUCT,
} from "src/constants/endpoints";
import IProduct from "src/types/IProduct";
import { getToken } from "./auth";

const getById = async (id: string) =>
  axios.get<IProduct>(GET_PRODUCT.replace(":id", id));

const getAll = async () => axios.get<IProduct[]>(GET_PRODUCTS);

const create = async (data: FormData) =>
  axios.post<IProduct>(CREATE_PRODUCT, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getToken()}`,
    },
  });

const update = async (id: string, data: FormData) =>
  axios.put<IProduct>(UPDATE_PRODUCT.replace(":id", id), data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getToken()}`,
    },
  });

const remove = async (id: string) =>
  axios.delete<IProduct>(DELETE_PRODUCT.replace(":id", id), {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export { getById, getAll, create, update, remove };
