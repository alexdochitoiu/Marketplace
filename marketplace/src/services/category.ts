import axios from "axios";
import { GET_CATEGORIES, GET_CATEGORY } from "src/constants/endpoints";
import ICategory from "src/types/ICategory";

const getById = async (id: string) =>
  axios.get<ICategory>(GET_CATEGORY.replace(":id", id));

const getAll = async () => axios.get<ICategory[]>(GET_CATEGORIES);

export { getById, getAll };
