import React from "react";
import ICategory from "src/types/ICategory";
import * as categoryService from "src/services/category";
import { getSectionLabel } from "src/utils";

interface IState {
  section: ICategory["section"];
  categories: ICategory[];
}

export default function () {
  const [categories, setCategories] = React.useState<ICategory[]>([]);

  React.useEffect(() => {
    categoryService.getAll().then(({ data }) => {
      setCategories(data);
    });
  }, []);

  return (
    <div className="container">
      <div className="flex-row" style={{ justifyContent: "center" }}>
        {categories.map((c) => (
          <CategoryCard key={c._id} category={c} />
        ))}
      </div>
    </div>
  );
}

interface ICardProps {
  category: ICategory;
}

const CategoryCard = ({ category }: ICardProps) => {
  return (
    <div className="category_card">
      <img src={category.image} />
      <h3>{getSectionLabel(category.section)}</h3>
      <h4>{category.title}</h4>
    </div>
  );
};
