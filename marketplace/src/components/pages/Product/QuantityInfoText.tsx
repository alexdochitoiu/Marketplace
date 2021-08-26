import { makeStyles } from "@material-ui/core";
import { ISize } from "src/types/IProduct";
import { FaInfoCircle } from "react-icons/fa";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    marginTop: 30,
    color: "#333",
    "& > svg": {
      color: "#2487d1",
      marginRight: 6,
    },
  },
});

interface IProps {
  selectedSize: ISize | null;
}

export default function ({ selectedSize }: IProps) {
  const classes = useStyles();
  let text;
  if (!selectedSize) {
    text = "Nu ai selectat mărimea";
  } else if (selectedSize.quantity === 0) {
    text = "Stoc epuizat. Disponibil doar pentru precomandă.";
  } else if (selectedSize.quantity === 1) {
    text = "Ultimul produs pe stoc";
  } else if (selectedSize.quantity <= 3) {
    text = `Ultimele ${selectedSize.quantity} produse`;
  } else {
    text = "În stoc";
  }
  return (
    <div className={classes.root}>
      <FaInfoCircle />
      {text}
    </div>
  );
}
