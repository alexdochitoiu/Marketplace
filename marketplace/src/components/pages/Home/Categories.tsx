import React from "react";
import ICategory from "src/types/ICategory";
import * as categoryService from "src/services/category";
import { getSectionLabel } from "src/utils";

export default function () {
  const [categories, setCategories] = React.useState<ICategory[]>([]);

  React.useEffect(() => {
    categoryService.getAll().then(({ data }) => {
      setCategories(
        data.sort((c1, c2) => (c1.section === c2.section ? 1 : -1))
      );
    });
  }, []);

  return (
    <div className="container">
      <div className="flex-row" style={{ justifyContent: "center" }}>
        {categories.map((c) => (
          <a key={c._id} href={`/produse/${c._id}`}>
            <CategoryCard category={c} />
          </a>
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
