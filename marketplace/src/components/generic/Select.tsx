import { makeStyles, MenuItem, Select, SelectProps } from "@material-ui/core";
import { MdKeyboardArrowDown } from "react-icons/md";

const useStyles = makeStyles({
  root: {
    borderRadius: 0,
  },
  selectRoot: {
    padding: "5px 15px",
  },
  poppins: {
    fontFamily: "Poppins, sans-serif",
    "& > li": {
      fontFamily: "Poppins, sans-serif",
    },
  },
  selectMenu: {
    borderRadius: 0,
  },
  icon: {
    top: "calc(50% - 8px)",
  },
});

interface IOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface IProps extends SelectProps {
  options: IOption[];
}

export default function ({ options, ...props }: IProps) {
  const classes = useStyles();
  return (
    <Select
      variant="outlined"
      className={classes.root}
      classes={{
        root: classes.selectRoot,
        select: classes.poppins,
        icon: classes.icon,
      }}
      IconComponent={MdKeyboardArrowDown}
      MenuProps={{
        classes: { paper: classes.selectMenu, list: classes.poppins },
        elevation: 1,
      }}
      {...props}
    >
      {options.map((o) => (
        <MenuItem key={o.value} value={o.value} disabled={o.disabled}>
          {o.label}
        </MenuItem>
      ))}
    </Select>
  );
}
