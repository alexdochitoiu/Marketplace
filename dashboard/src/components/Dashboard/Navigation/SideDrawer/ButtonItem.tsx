import {
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
  Tooltip,
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
  tooltip?: boolean;
}

export default function ({ onClick, text, icon, active, tooltip }: IProps) {
  const classes = useStyles();
  const withTooltip = (WrappedComponent: JSX.Element) => (
    <Tooltip placement="right" title={text} arrow={true}>
      <div>{WrappedComponent}</div>
    </Tooltip>
  );
  const Button = () => (
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
  return tooltip ? withTooltip(<Button />) : <Button />;
}
