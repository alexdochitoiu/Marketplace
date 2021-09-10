import { makeStyles } from "@material-ui/core";
import { AiOutlineShopping } from "react-icons/ai";
import Button from "../Button";

const useStyles = makeStyles({
  btn: {
    marginLeft: 12,
    color: "#fff",
    background: "#444",
    textAlign: "center",
    fontSize: 12,
    padding: "8px 16px",
  },
});

export default function () {
  const classes = useStyles();
  return (
    <span className="flex-row">
      <AiOutlineShopping className="snack-icon" />
      Produsul a fost adăugat în coș
      <Button
        href="/cos-de-cumparaturi"
        animation="fade"
        text="Vezi cosul"
        className={classes.btn}
      />
    </span>
  );
}
