import { makeStyles } from "@material-ui/core";
import { BiHeart } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";

const useStyles = makeStyles({
  icon: {
    color: "var(--primary)",
    marginRight: 10,
    width: 25,
    height: 25,
  },
});

export default function ({ operation }) {
  const classes = useStyles();
  return operation === "added" ? (
    <span className="flex-row">
      <FaHeart className={classes.icon} />
      Produs adaugat la lista de favorite
    </span>
  ) : (
    <span className="flex-row">
      <BiHeart className={classes.icon} />
      Produs sters din lista de favorite
    </span>
  );
}
