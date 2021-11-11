import { BiHeart } from "react-icons/bi";
import { Badge } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/types";

export default function ({ darkBg = false }) {
  const wishlist = useSelector((state: RootState) => state.wishlist);
  return (
    <a href="/favorite">
      <Badge
        color={darkBg ? "primary" : "secondary"}
        badgeContent={`${wishlist.length}`}
      >
        <BiHeart
          fontSize={22}
          className="btn"
          style={{ color: darkBg ? "#fff" : "#000" }}
        />
      </Badge>
    </a>
  );
}
