import axios from "axios";
import {
  GET_PRODUCT,
  GET_PRODUCTS,
  GET_PRODUCTS_BY_CATEGORY,
  GET_PRODUCTS_BY_IDS,
  GET_PRODUCTS_BY_PRODUCT_CODE,
  GET_PRODUCTS_BY_SECTION,
} from "src/constants/endpoints";
import ICategory from "src/types/ICategory";
import IProduct from "src/types/IProduct";

const getById = async (id: string) =>
  axios.get<IProduct>(GET_PRODUCT.replace(":id", id));

const getByIds = async (ids: string[]) =>
  axios.post<IProduct[]>(GET_PRODUCTS_BY_IDS, { ids });

const getAll = async () => axios.get<IProduct[]>(GET_PRODUCTS);

const getByProductCode = async (productCode: string) =>
  axios.get<IProduct[]>(
    GET_PRODUCTS_BY_PRODUCT_CODE.replace(":productCode", productCode)
  );

const getByCategory = async (categoryId: string) =>
  axios.get<IProduct[]>(
    GET_PRODUCTS_BY_CATEGORY.replace(":categoryId", categoryId)
  );

const getBySection = async (section: ICategory["section"]) =>
  axios.get<IProduct[]>(
    GET_PRODUCTS_BY_SECTION.replace(":sectionType", section)
  );

export {
  getById,
  getAll,
  getByProductCode,
  getByCategory,
  getByIds,
  getBySection,
};
