import React from "react";
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import ICategory from "src/types/ICategory";
import * as categoryService from "src/services/category";
import { Collapse } from "@material-ui/core";
import { getSectionLabel } from "src/utils";
import { FaAngleDown } from "react-icons/fa";

interface IState {
  section: ICategory["section"];
  categories: ICategory[];
}

export default function () {
  const [categories, setCategories] = React.useState<IState[]>([]);
  const [expanded, setExpanded] = React.useState(false);
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "15px",
      }}
    >
      {expanded ? (
        <IoMdClose
          className="mobile-nav-button"
          onClick={() => setExpanded((e) => !e)}
        />
      ) : (
        <FiMenu
          className="mobile-nav-button"
          onClick={() => setExpanded((e) => !e)}
        />
      )}
      <nav className="mobile-nav">
        <Collapse in={expanded}>
          <ul>
            <a href="/">
              <li>Acasă</li>
            </a>
            <a onClick={() => setMenu(!menu)}>
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  background: menu ? "#eee" : "initial",
                  padding: menu ? 20 : 5,
                }}
              >
                <span>
                  Produse{" "}
                  <FaAngleDown
                    style={{
                      transition: "0.3s transform ease-in",
                      transform: !menu ? "rotate(-90deg)" : "initial",
                    }}
                  />
                </span>
                <Collapse in={menu} unmountOnExit={true}>
                  <ul>
                    {categories.map((c) => (
                      <a key={c.section} href={"/produse/section/" + c.section}>
                        <li>
                          {getSectionLabel(c.section)}
                          {/* {c.categories.length > 0 && <FaAngleDown />}
                          {c.categories.length > 0 && (
                            <ul>
                              {c.categories.map((c, idx) => (
                                <a key={c._id} href={"/produse/" + c._id}>
                                  <li>{c.title}</li>
                                </a>
                              ))}
                            </ul>
                          )} */}
                        </li>
                      </a>
                    ))}
                    <a href="/produse/section/all">
                      <li>Toate</li>
                    </a>
                  </ul>
                </Collapse>
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
        </Collapse>
      </nav>
    </div>
  );

  // return (
  //   <nav>
  //     <ul className="main-menu">
  //       <a href="/">
  //         <li>Acasă</li>
  //       </a>
  //       <a onClick={() => setMenu(!menu)}>
  //         <li
  //           style={
  //             menu
  //               ? {
  //                   color: "var(--primary)",
  //                   borderBottom: "3px solid var(--primary)",
  //                 }
  //               : {}
  //           }
  //           className="flex-row"
  //         >
  //           Produse{" "}
  //           <FaAngleDown
  //             style={{
  //               transition: "0.3s transform ease-in",
  //               transform: !menu ? "rotate(-90deg)" : "initial",
  //             }}
  //           />
  //         </li>
  //       </a>
  //       <a href="/blog">
  //         <li>Blog</li>
  //       </a>
  //       <a href="/despre-noi">
  //         <li>Despre noi</li>
  //       </a>
  //       <a href="/contact">
  //         <li>Contact</li>
  //       </a>
  //     </ul>
  //     <Collapse in={menu}>
  //       <ul
  //         className="main-menu products-menu"
  //         style={{ borderTop: `1px solid ${menu ? "#999" : "#fff"}` }}
  //       >
  //         {categories.map((c) => (
  //           <a key={c.section} href={"/produse/section/" + c.section}>
  //             <li className="flex-row">
  //               {getSectionLabel(c.section)}{" "}
  //               {c.categories.length > 0 && <FaAngleDown />}
  //               {c.categories.length > 0 && (
  //                 <ul className="sub-menu">
  //                   {c.categories.map((c, idx) => (
  //                     <a key={c._id} href={"/produse/" + c._id}>
  //                       <li>{c.title}</li>
  //                     </a>
  //                   ))}
  //                 </ul>
  //               )}
  //             </li>
  //           </a>
  //         ))}
  //         <a href="/produse/section/all">
  //           <li>Toate</li>
  //         </a>
  //       </ul>
  //     </Collapse>
  //   </nav>
  // );
}
