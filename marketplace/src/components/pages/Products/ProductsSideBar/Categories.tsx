import React from "react";
import ICategory from "src/types/ICategory";
import * as categoryService from "src/services/category";
import { useRouteMatch } from "react-router-dom";
import { getSectionLabel } from "src/utils";

interface IState {
  section: ICategory["section"];
  categories: ICategory[];
}

export default function () {
  const [categories, setCategories] = React.useState<IState[]>([]);
  const router = useRouteMatch<any>();

  React.useEffect(() => {
    categoryService.getAll().then(({ data }) => {
      const sections: ICategory["section"][] = [
        "men",
        "women",
        "kids",
        "other",
      ];
      setCategories(
        sections.map((s) => ({
          section: s,
          categories: data.filter((c) => c.section === s),
        }))
      );
    });
  }, []);

  const total = categories.reduce(
    (acc, curr) =>
      acc + curr.categories.reduce((acc, curr) => acc + curr.productsCount, 0),
    0
  );

  const showCategories = (category: IState): boolean =>
    [
      `/produse/section/${category.section}`,
      ...category.categories.map((c) => `/produse/${c._id}`),
    ].indexOf(router.url) !== -1;

  return (
    <div>
      <h3 className="sidebar-title">Categorii</h3>
      <ul>
        <li
          style={{ fontFamily: "Oswald", fontSize: 16 }}
          className={router.url === "/produse/section/all" ? "active" : ""}
        >
          <a href="/produse/section/all">Toate</a>
          <span>({total})</span>
        </li>
        {categories.map((c) => (
          <React.Fragment key={c.section}>
            <li
              className={
                router.url === `/produse/section/${c.section}` ? "active" : ""
              }
              style={{ fontFamily: "Oswald", fontSize: 16 }}
            >
              <a href={`/produse/section/${c.section}`}>
                {getSectionLabel(c.section)}
              </a>
              <span>
                (
                {c.categories.reduce(
                  (acc, curr) => acc + curr.productsCount,
                  0
                )}
                )
              </span>
            </li>
            {showCategories(c) &&
              c.categories.map((c) => (
                <li
                  key={c._id}
                  className={router.url === `/produse/${c._id}` ? "active" : ""}
                  style={{ marginLeft: 8 }}
                >
                  <a href={`/produse/${c._id}`}>{c.title}</a>
                  <span>({c.productsCount})</span>
                </li>
              ))}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
}
