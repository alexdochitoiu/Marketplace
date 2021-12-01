import "./style.css";
import { AiOutlineShopping } from "react-icons/ai";
import { Badge, Fab, Tooltip } from "@material-ui/core";
import { RootState } from "src/redux/types";
import { useSelector } from "react-redux";

export default function () {
  const cart = useSelector((state: RootState) => state.cart);
  return (
    <a href="/cos-de-cumparaturi">
      <Tooltip
        arrow={true}
        placement="left"
        title={`Aveti ${cart.length} produse in cos! Apasati pentru a vedea continutul cosului!`}
      >
        <Fab
          id="cart-fixed-button"
          size="small"
          style={{ right: cart.length > 0 ? 10 : -50 }}
        >
          <Badge color="primary" badgeContent={`${cart.length}`}>
            <AiOutlineShopping style={{ padding: 5 }} fontSize={22} />
          </Badge>
        </Fab>
      </Tooltip>
    </a>
  );
}
