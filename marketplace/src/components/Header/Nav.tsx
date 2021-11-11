import React from "react";
import { FaAngleDown } from "react-icons/fa";
import ICategory from "src/types/ICategory";
import * as categoryService from "src/services/category";
import { Collapse } from "@material-ui/core";
import { getSectionLabel } from "src/utils";

interface IState {
  section: ICategory["section"];
  categories: ICategory[];
}

export default function () {
  const [categories, setCategories] = React.useState<IState[]>([]);
  const [menu, setMenu] = React.useState(false);

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

  return (
    <nav>
      <ul className="main-menu">
        <a href="/">
          <li>Acasă</li>
        </a>
        <a>
          <li className="flex-row">
            Produse{" "}
            <FaAngleDown
              style={{
                transition: "0.3s transform ease-in",
                transform: "initial",
              }}
            />
            <ul
              className="sub-menu"
              style={{ borderTop: `1px solid ${menu ? "#999" : "#fff"}` }}
            >
              {categories.map((c) => (
                <a key={c.section} href={"/produse/section/" + c.section}>
                  <li className="flex-row">
                    {getSectionLabel(c.section)}{" "}
                    {c.categories.length > 0 && <FaAngleDown />}
                    {c.categories.length > 0 && (
                      <ul className="categories-sub-menu">
                        {c.categories.map((c, idx) => (
                          <a key={c._id} href={"/produse/" + c._id}>
                            <li>{c.title}</li>
                          </a>
                        ))}
                      </ul>
                    )}
                  </li>
                </a>
              ))}
              <a href="/produse/section/all">
                <li>Toate</li>
              </a>
            </ul>
          </li>
        </a>
        <a href="/blog">
          <li>Blog</li>
        </a>
        <a href="/despre-noi">
          <li>Despre noi</li>
        </a>
        <a href="/contact">
          <li>Contact</li>
        </a>
      </ul>
    </nav>
  );
}
