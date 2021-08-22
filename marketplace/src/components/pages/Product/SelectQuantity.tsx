import { makeStyles } from "@material-ui/core";
import { BiPlus, BiMinus } from "react-icons/bi";

const useStyles = makeStyles({
  root: {
    position: "relative",
    marginRight: 30,
  },
  input: {
    fontSize: 16,
    height: 49,
    margin: 0,
    padding: "0 25px",
    textAlign: "center",
    width: 30,
    background: "#f4f4f4",
    border: "1px solid rgb(221, 221, 221)",
  },
  btn: {
    cursor: "pointer",
    color: "#666",
    position: "absolute",
    top: 18,
    transition: "all 0.2s ease-in",
    "&:hover": {
      color: "#fff",
      backgroundColor: "var(--primary)",
    },
  },
});

interface IProps {
  value: string;
  onChange: (e: any) => void;
}

export default function ({ value, onChange }: IProps) {
  const classes = useStyles();

  const handleChangeFromButtons = (type: "increment" | "decrement") => {
    if (!value) {
      onChange({ target: { value: "1" } });
      return;
    }
    const numVal = parseInt(value, 10);
    if (type === "decrement" && numVal === 1) {
      return;
    }
    if (type === "increment" && numVal === 25) {
      return;
    }
    const step = type === "increment" ? 1 : -1;
    onChange({ target: { value: `${numVal + step}` } });
  };

  const handleChange = (e) => {
    const numValue = parseInt(e.target.value, 10);
    if (numValue > 25) {
      onChange({ target: { value: "25" } });
      return;
    }
    onChange(e);
  };

  return (
    <div className={classes.root}>
      {parseInt(value, 10) > 1 && (
        <BiMinus
          onClick={() => handleChangeFromButtons("decrement")}
          className={classes.btn}
          style={{ left: 5 }}
        />
      )}
      <input
        value={value}
        id="quantity"
        className={classes.input}
        type="number"
        onChange={handleChange}
      />
      {parseInt(value, 10) < 25 && (
        <BiPlus
          onClick={() => handleChangeFromButtons("increment")}
          className={classes.btn}
          style={{ right: 5 }}
        />
      )}
    </div>
  );
}
