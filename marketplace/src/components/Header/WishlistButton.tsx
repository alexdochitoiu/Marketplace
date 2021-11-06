import { BiHeart } from "react-icons/bi";
import { Badge } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/types";

export default function () {
  const wishlist = useSelector((state: RootState) => state.wishlist);
  return (
    <a href="/favorite">
      <Badge color="secondary" badgeContent={`${wishlist.length}`}>
        <BiHeart fontSize={22} className="btn" />
      </Badge>
    </a>
  );
}
