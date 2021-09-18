import ICategory from "src/types/ICategory";

export const getSectionLabel = (section: ICategory["section"] | "all") => {
  switch (section) {
    case "men":
      return "Bărbați";
    case "women":
      return "Femei";
    case "kids":
      return "Copii";
    case "other":
      return "Altele";
    default:
      return "Toate";
  }
};
