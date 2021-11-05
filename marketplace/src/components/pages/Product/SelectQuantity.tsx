import { makeStyles } from "@material-ui/core";
import { BiPlus, BiMinus } from "react-icons/bi";

const useStyles = makeStyles<any, any>({
  root: {
    position: "relative",
    marginRight: 30,
    width: 80,
  },
  input: {
    fontSize: ({ size }) => (size == "small" ? 13 : 16),
    height: ({ size }) => (size == "small" ? 30 : 49),
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
    top: ({ size }) => (size == "small" ? 8 : 18),
    transition: "all 0.2s ease-in",
    "&:hover": {
      color: "#fff",
      backgroundColor: "var(--primary)",
    },
  },
});

interface IProps {
  value: string;
  max?: number;
  onChange: (e: any) => void;
  size?: "small" | "normal";
}

export default function ({ value, max, onChange, size = "normal" }: IProps) {
  const classes = useStyles({ size });
  const maxValue = max || 25;

  const handleChangeFromButtons = (type: "increment" | "decrement") => {
    if (!value) {
      onChange({ target: { value: "1" } });
      return;
    }
    const numVal = parseInt(value, 10);
    if (type === "decrement" && numVal === 1) {
      return;
    }
    if (type === "increment" && numVal === maxValue) {
      return;
    }
    const step = type === "increment" ? 1 : -1;
    onChange({ target: { value: `${numVal + step}` } });
  };

  const handleChange = (e) => {
    const numValue = parseInt(e.target.value, 10);
    if (numValue > maxValue) {
      onChange({ target: { value: maxValue } });
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
      {parseInt(value, 10) < maxValue && (
        <BiPlus
          onClick={() => handleChangeFromButtons("increment")}
          className={classes.btn}
          style={{ right: 5 }}
        />
      )}
    </div>
  );
}
