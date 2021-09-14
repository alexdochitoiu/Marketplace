import axios from "axios";
import {
  GET_CATEGORIES,
  GET_CATEGORIES_BY_SECTION,
  GET_CATEGORY,
} from "src/constants/endpoints";
import ICategory from "src/types/ICategory";

const getById = async (id: string) =>
  axios.get<ICategory>(GET_CATEGORY.replace(":id", id));

const getAll = async () => axios.get<ICategory[]>(GET_CATEGORIES);

const getBySection = async (section: ICategory["section"]) =>
  axios.get<ICategory[]>(
    GET_CATEGORIES_BY_SECTION.replace(":sectionType", section)
  );

export { getById, getAll, getBySection };
