import React from "react";
import { FaAngleDown } from "react-icons/fa";
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
    <nav>
      <ul className="main-menu">
        <a href="/">
          <li>Acasa</li>
        </a>
        <a href="/produse">
          <li>
            <span className="flex-row">
              Produse {categories.length > 0 && <FaAngleDown />}
            </span>
            {categories.length > 0 && (
              <ul className="sub-menu">
                {categories.map((c, idx) => (
                  <a href={"/produse/" + c._id}>
                    <li key={idx}>{c.title}</li>
                  </a>
                ))}
              </ul>
            )}
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
