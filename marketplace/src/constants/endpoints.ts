import { HOST } from "./host";

// categories
export const GET_CATEGORY = HOST + "/api/category/:id";
export const GET_CATEGORIES = HOST + "/api/category";

// products
export const GET_PRODUCT = HOST + "/api/product/:id";
export const GET_PRODUCTS = HOST + "/api/product";
export const GET_PRODUCTS_BY_PRODUCT_CODE =
  HOST + "/api/product/product-code/:productCode";
