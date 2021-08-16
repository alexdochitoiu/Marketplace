import axios from "axios";
import { GET_PRODUCT, GET_PRODUCTS } from "src/constants/endpoints";
import IProduct from "src/types/IProduct";

const getById = async (id: string) =>
  axios.get<IProduct>(GET_PRODUCT.replace(":id", id));

const getAll = async () => axios.get<IProduct[]>(GET_PRODUCTS);

export { getById, getAll };
