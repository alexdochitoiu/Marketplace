import {
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
} from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) => ({
  active: {
    backgroundColor: "#eee",
    boxShadow: "inset 0 0 1px 0 #888",
  },
  activeText: {
    color: theme.palette.primary.main,
    "& > span": { fontWeight: "bold" },
  },
}));

interface IProps {
  onClick: () => void;
  text: string;
  icon: JSX.Element;
  active?: boolean;
}

export default function ({ onClick, text, icon, active }: IProps) {
  const classes = useStyles();
  return (
    <ListItem
      button={true}
      onClick={onClick}
      className={clsx({ [classes.active]: active })}
    >
      <ListItemIcon className={clsx({ [classes.activeText]: active })}>
        {icon}
      </ListItemIcon>
      <ListItemText
        className={clsx({ [classes.activeText]: active })}
        primary={text}
      />
    </ListItem>
  );
}
