import { AiOutlineShopping } from "react-icons/ai";
import { Badge } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/types";

export default function () {
  const cart = useSelector((state: RootState) => state.cart);
  return (
    <a href="/cos-de-cumparaturi">
      <Badge color="secondary" badgeContent={`${cart.length}`}>
        <AiOutlineShopping fontSize={22} className="btn" />
      </Badge>
    </a>
  );
}
