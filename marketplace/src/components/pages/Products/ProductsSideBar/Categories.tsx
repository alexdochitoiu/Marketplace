import React from "react";
import ICategory from "src/types/ICategory";
import * as categoryService from "src/services/category";
import { useRouteMatch } from "react-router-dom";

export default function () {
  const [categories, setCategories] = React.useState<ICategory[]>([]);
  const router = useRouteMatch<any>();

  React.useEffect(() => {
    categoryService.getAll().then(({ data }) => {
      setCategories(data);
    });
  });

  return (
    <div>
      <h3 className="sidebar-title">Categorii</h3>
      <ul>
        <li className={router.url === "/produse" ? "active" : ""}>
          <a href="/produse">Toate</a>
          <span>(89)</span>
        </li>
        {categories.map((c) => (
          <li
            key={c._id}
            className={router.url === `/produse/${c._id}` ? "active" : ""}
          >
            <a href={`/produse/${c._id}`}>{c.title}</a>
            <span>({c.title.length})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
