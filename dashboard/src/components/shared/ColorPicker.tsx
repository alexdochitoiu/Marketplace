import { makeStyles, Popper } from "@material-ui/core";
import React from "react";
import { ColorResult, SwatchesPicker } from "react-color";

const useStyles = makeStyles({
  swatch: {
    padding: "5px",
    background: "#fff",
    borderRadius: "1px",
    boxShadow: "0 0 0 1px rgba(0, 0, 0, .1)",
    display: "inline-block",
    cursor: "pointer",
  },
  color: {
    width: 36,
    height: 14,
    borderRadius: 2,
  },
});

interface IProps {
  color?: string;
  onChange: (color: string) => void;
}

export default function ({ color, onChange }: IProps) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handleChange = (color: ColorResult) => {
    onChange(color.hex);
    setAnchorEl(null);
  };

  return (
    <div>
      <div
        className={classes.swatch}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <div
          className={classes.color}
          style={{ backgroundColor: color || "#222" }}
        />
      </div>
      <Popper
        style={{ zIndex: 1500 }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
      >
        <SwatchesPicker onChange={handleChange} />
      </Popper>
    </div>
  );
}
