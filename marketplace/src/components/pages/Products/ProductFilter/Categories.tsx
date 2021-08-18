import React from "react";
import ICategory from "src/types/ICategory";
import * as categoryService from "src/services/category";

export default function () {
  const [categories, setCategories] = React.useState<ICategory[]>([]);

  React.useEffect(() => {
    categoryService.getAll().then(({ data }) => {
      setCategories(data);
    });
  });

  return (
    <div>
      <h3 className="sidebar-title">Categorii</h3>
      <ul>
        <li>
          <a href="/produse">Toate</a>
          <span>(89)</span>
        </li>
        {categories.map((c) => (
          <li key={c._id}>
            <a href={"/categorii/" + c._id}>{c.title}</a>
            <span>({c.title.length})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
