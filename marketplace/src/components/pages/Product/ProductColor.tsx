import { makeStyles } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles({
  root: {
    cursor: "pointer",
    marginRight: 10,
    width: 30,
    height: 30,
    borderRadius: "50%",
    padding: 5,
    border: "1px solid rgb(221, 221, 221)",
    background: "#f4f4f4",
    transition: "all 0.3s ease-in-out",
  },
  selected: {
    borderColor: "#444",
  },
  swatch: {
    borderRadius: "50%",
    width: "100%",
    height: "100%",
  },
});

interface IProps {
  color: string;
  selected?: boolean;
}

export default function ({ color, selected }: IProps) {
  const classes = useStyles();
  return (
    <div className={clsx(classes.root, { [classes.selected]: selected })}>
      <div className={classes.swatch} style={{ background: color }} />
    </div>
  );
}
