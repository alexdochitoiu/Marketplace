import axios from "axios";
import {
  DELETE_ORDER,
  GET_ORDER,
  GET_ORDERS,
  UPDATE_ORDER,
} from "src/constants/endpoints";
import IOrder from "src/types/IOrder";
import { getToken } from "./auth";

const getById = async (id: string) =>
  axios.get<IOrder>(GET_ORDER.replace(":id", id));

const getAll = async () => axios.get<IOrder[]>(GET_ORDERS);

const remove = async (id: string) =>
  axios.delete<IOrder>(DELETE_ORDER.replace(":id", id), {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

const update = async (id: string, data: FormData) =>
  axios.put<IOrder>(UPDATE_ORDER.replace(":id", id), data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getToken()}`,
    },
  });

export { getById, getAll, remove, update };
