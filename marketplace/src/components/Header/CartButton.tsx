import { AiOutlineShopping } from "react-icons/ai";
import { Badge } from "@material-ui/core";

export default function () {
  return (
    <Badge color="secondary" badgeContent="0">
      <AiOutlineShopping fontSize={22} className="btn" />
    </Badge>
  );
}
