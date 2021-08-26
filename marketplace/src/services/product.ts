import axios from "axios";
import {
  GET_PRODUCT,
  GET_PRODUCTS,
  GET_PRODUCTS_BY_CATEGORY,
  GET_PRODUCTS_BY_PRODUCT_CODE,
} from "src/constants/endpoints";
import IProduct from "src/types/IProduct";

const getById = async (id: string) =>
  axios.get<IProduct>(GET_PRODUCT.replace(":id", id));

const getAll = async () => axios.get<IProduct[]>(GET_PRODUCTS);

const getByProductCode = async (productCode: string) =>
  axios.get<IProduct[]>(
    GET_PRODUCTS_BY_PRODUCT_CODE.replace(":productCode", productCode)
  );

const getByCategory = async (categoryId: string) =>
  axios.get<IProduct[]>(
    GET_PRODUCTS_BY_CATEGORY.replace(":categoryId", categoryId)
  );

export { getById, getAll, getByProductCode, getByCategory };
