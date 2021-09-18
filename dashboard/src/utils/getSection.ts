import ICategory from "src/types/ICategory";

export const getSection = (section: ICategory["section"]) => {
  switch (section) {
    case "men":
      return "Barbati";
    case "women":
      return "Femei";
    case "kids":
      return "Kids";
    case "other":
      return "Altele";
  }
};
