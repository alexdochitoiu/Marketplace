import { HOST } from "./host";

// auth
export const LOGIN = HOST + "/api/dashboard/login";

// photos
export const GET_PHOTOS = HOST + "/api/photo";
export const UPLOAD_PHOTOS = HOST + "/api/photo/upload";
export const DELETE_PHOTOS = HOST + "/api/photo/delete";

// categories
export const GET_CATEGORY = HOST + "/api/category/:id";
export const GET_CATEGORIES = HOST + "/api/category";
export const CREATE_CATEGORY = HOST + "/api/category/create";
export const UPDATE_CATEGORY = HOST + "/api/category/update/:id";
export const DELETE_CATEGORY = HOST + "/api/category/delete/:id";

// products
export const GET_PRODUCT = HOST + "/api/product/:id";
export const GET_PRODUCTS = HOST + "/api/product";
export const CREATE_PRODUCT = HOST + "/api/product/create";
export const UPDATE_PRODUCT = HOST + "/api/product/update/:id";
export const DELETE_PRODUCT = HOST + "/api/product/delete/:id";
