import ProductSort from "./ProductSort";
import ViewModeButtons from "./ViewModeButtons";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/redux/types";
import { Chip } from "@material-ui/core";
import {
  doChangePriceInterval,
  doChangeProductSearchValue,
} from "src/redux/actions";

interface IProps {
  productsCount: number;
}

export default function ({ productsCount }: IProps) {
  const dispatch = useDispatch();
  const priceInterval = useSelector((state: RootState) => state.priceInterval);
  const productSearchValue = useSelector(
    (state: RootState) => state.productSearchValue
  );

  const handleRemovePriceInterval = () => {
    dispatch(doChangePriceInterval(null));
  };

  const handleRemoveSearchValue = () => {
    dispatch(doChangeProductSearchValue(""));
  };

  return (
    <div className="products-sort">
      <div style={{ display: "flex", alignItems: "center" }}>
        <h4>{productsCount} produse disponibile</h4>
        <ProductSort />
        {productSearchValue && (
          <Chip
            label={
              <span>
                <b>Titlu: </b>
                {productSearchValue}
              </span>
            }
            onDelete={handleRemoveSearchValue}
            variant="outlined"
            classes={{ root: "filter-chip" }}
          />
        )}
        {priceInterval && (
          <Chip
            label={
              <span>
                <b>Pret: </b>
                {priceInterval[0]} - {priceInterval[1]} RON
              </span>
            }
            onDelete={handleRemovePriceInterval}
            variant="outlined"
            classes={{ root: "filter-chip" }}
          />
        )}
      </div>
      <ViewModeButtons />
    </div>
  );
}
