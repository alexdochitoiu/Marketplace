import React from "react";
import TitleBanner from "src/components/generic/TitleBanner";
import * as categoryService from "src/services/category";
import "./styles.css";
import ICategory from "src/types/ICategory";
import { useRouteMatch } from "react-router-dom";

export default function () {
  const [category, setCategory] = React.useState<ICategory | null>(null);
  const router = useRouteMatch<any>();

  React.useEffect(() => {
    const { categoryId } = router.params;
    if (categoryId) {
      categoryService.getById(categoryId).then(({ data }) => setCategory(data));
    }
  }, []);

  return (
    <div>
      <TitleBanner title={category?.title || "Articole"} />
    </div>
  );
}
