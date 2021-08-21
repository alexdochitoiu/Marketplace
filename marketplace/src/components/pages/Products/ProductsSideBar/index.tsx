import "./styles.css";
import Categories from "./Categories";
import PriceFilter from "./PriceFilter";
import SearchProducts from "./SearchProducts";

export default function () {
  return (
    <div className="filter-sidebar">
      <SearchProducts />
      <PriceFilter />
      <Categories />
    </div>
  );
}
