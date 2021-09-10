import { BiHeart } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";

export default function ({ operation }) {
  return operation === "added" ? (
    <span className="flex-row">
      <FaHeart className="snack-icon" />
      Produs adaugat la lista de favorite
    </span>
  ) : (
    <span className="flex-row">
      <BiHeart className="snack-icon" />
      Produs sters din lista de favorite
    </span>
  );
}
