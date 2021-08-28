import React from "react";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { doChangeProductSearchValue } from "src/redux/actions";
import { RootState } from "src/redux/types";

export default function () {
  const dispatch = useDispatch();
  const productSearchValue = useSelector(
    (state: RootState) => state.productSearchValue
  );
  const [value, setValue] = React.useState(productSearchValue);

  React.useEffect(() => {
    if (!productSearchValue) {
      setValue("");
    }
  }, [productSearchValue]);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(doChangeProductSearchValue(value));
  };

  return (
    <div className="sidebar-item">
      <h3 className="sidebar-title">Cauta produse</h3>
      <form>
        <input
          type="text"
          placeholder="Cauta produse..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={handleClick}>
          <BsSearch />
        </button>
      </form>
    </div>
  );
}
