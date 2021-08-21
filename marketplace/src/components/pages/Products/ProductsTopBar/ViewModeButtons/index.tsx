import "./styles.css";
import { BsFillGrid3X3GapFill as GridViewIcon } from "react-icons/bs";
import { GiHamburgerMenu as ListViewIcon } from "react-icons/gi";
import { Tooltip } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/redux/types";
import { doChangeProductsViewMode } from "src/redux/actions";

export default function () {
  const dispatch = useDispatch();
  const viewMode = useSelector((state: RootState) => state.productsViewMode);
  return (
    <div className="ViewModeButtons_root">
      <Tooltip placement="top" title="Vizualizare in mod grila">
        <div
          className={viewMode === "grid" ? "active" : ""}
          onClick={() => dispatch(doChangeProductsViewMode("grid"))}
        >
          <GridViewIcon style={{ width: 24, height: 28 }} />
        </div>
      </Tooltip>
      <Tooltip placement="top" title="Vizualizare in mod lista">
        <div
          className={viewMode === "list" ? "active" : ""}
          onClick={() => dispatch(doChangeProductsViewMode("list"))}
        >
          <ListViewIcon style={{ width: 32, height: 28 }} />
        </div>
      </Tooltip>
    </div>
  );
}
