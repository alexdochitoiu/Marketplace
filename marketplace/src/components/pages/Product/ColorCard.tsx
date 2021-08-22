import { makeStyles } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles({
  root: {
    cursor: "pointer",
    marginRight: 10,
    width: 50,
    padding: 5,
    border: "1px solid rgb(221, 221, 221)",
    background: "#f4f4f4",
    transition: "all 0.3s ease-in-out",
  },
  selected: {
    width: 100,
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
      <div style={{ background: color, width: "100%", height: 30 }} />
    </div>
  );
}
