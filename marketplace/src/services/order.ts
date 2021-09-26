import axios from "axios";
import { CREATE_ORDER, GET_ORDER } from "src/constants/endpoints";
import IOrder from "src/types/IOrder";

const create = async (body) => axios.post<IOrder>(CREATE_ORDER, body);

const getById = async (id: string) =>
  axios.get<IOrder>(GET_ORDER.replace(":id", id));

export { create, getById };
