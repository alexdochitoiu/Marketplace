import { HOST } from "./host";

// categories
export const GET_CATEGORY = HOST + "/api/category/:id";
export const GET_CATEGORIES_BY_SECTION =
  HOST + "/api/category/section/:sectionType";
export const GET_CATEGORIES = HOST + "/api/category";

// products
export const GET_PRODUCT = HOST + "/api/product/:id";
export const GET_PRODUCTS = HOST + "/api/product";
export const GET_PRODUCTS_BY_PRODUCT_CODE =
  HOST + "/api/product/product-code/:productCode";
export const GET_PRODUCTS_BY_CATEGORY =
  HOST + "/api/product/category/:categoryId";
export const GET_PRODUCTS_BY_SECTION =
  HOST + "/api/product/section/:sectionType";
export const GET_PRODUCTS_BY_IDS = HOST + "/api/product/ids";

// order
export const CREATE_ORDER = HOST + "/api/order/create";
export const GET_ORDER = HOST + "/api/order/:id";
