import React from "react";
import { FaAngleDown } from "react-icons/fa";
import ICategory from "src/types/ICategory";
import * as categoryService from "src/services/category";
import { Collapse } from "@material-ui/core";

export default function () {
  const [categories, setCategories] = React.useState<ICategory[]>([]);
  const [menu, setMenu] = React.useState(false);

  React.useEffect(() => {
    categoryService.getAll().then(({ data }) => {
      setCategories(data);
    });
  });

  return (
    <nav style={{ flex: 1, margin: "0 25px" }}>
      <ul className="main-menu">
        <a href="/">
          <li>Acasă</li>
        </a>
        <a onClick={() => setMenu(!menu)}>
          <li
            style={
              menu
                ? {
                    color: "var(--primary)",
                    borderBottom: "3px solid var(--primary)",
                  }
                : {}
            }
          >
            Produse
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
      <Collapse in={menu}>
        <ul
          className="main-menu products-menu"
          style={{ borderTop: `1px solid ${menu ? "#999" : "#fff"}` }}
        >
          <a>
            <li className="flex-row">
              Bărbați <FaAngleDown />
              {categories.length > 0 && (
                <ul className="sub-menu">
                  {categories.map((c, idx) => (
                    <a key={idx} href={"/produse/" + c._id}>
                      <li>{c.title}</li>
                    </a>
                  ))}
                </ul>
              )}
            </li>
          </a>
          <a>
            <li className="flex-row">
              Femei <FaAngleDown />
              {categories.length > 0 && (
                <ul className="sub-menu">
                  {categories.map((c, idx) => (
                    <a key={idx} href={"/produse/" + c._id}>
                      <li>{c.title}</li>
                    </a>
                  ))}
                </ul>
              )}
            </li>
          </a>
          <a>
            <li className="flex-row">
              Copii <FaAngleDown />
              {categories.length > 0 && (
                <ul className="sub-menu">
                  {categories.map((c, idx) => (
                    <a key={idx} href={"/produse/" + c._id}>
                      <li>{c.title}</li>
                    </a>
                  ))}
                </ul>
              )}
            </li>
          </a>
        </ul>
      </Collapse>
    </nav>
  );
}
