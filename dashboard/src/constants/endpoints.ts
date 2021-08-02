import { HOST } from "./host";

export const LOGIN = HOST + "/api/dashboard/login";

export const GET_PHOTOS = HOST + "/api/photo";
export const UPLOAD_PHOTOS = HOST + "/api/photo/upload";

export const GET_CATEGORIES = HOST + "/api/category";
export const DELETE_CATEGORY = HOST + "/api/category/delete/:id";
export const CREATE_CATEGORY = HOST + "/api/category/create";
