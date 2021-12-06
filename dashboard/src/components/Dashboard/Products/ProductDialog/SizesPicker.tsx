import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Chip,
  makeStyles,
  Theme,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import IProduct from "src/types/IProduct";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const useStyles = makeStyles((theme: Theme) => ({
  chip: {
    margin: 2,
    cursor: "pointer",
    "&:hover": {
      background: "grey !important",
      color: "#fff",
    },
  },
  selected: {
    background: theme.palette.primary.main,
    color: "#fff",
    fontWeight: "bold",
  },
}));

const getSizes = (sizeType: IProduct["sizeType"]): string[] => {
  let result: string[] = [];
  if (sizeType === "universal") {
    return ["Universala"];
  } else if (sizeType === "hat") {
    const hatSizes = [53, 61];
    for (let i = hatSizes[0]; i <= hatSizes[1]; i++) {
      result.push(`${i}`);
    }
    return result;
  }
  const clothesSizes = [
    "32/34 (XS)",
    "36/38 (S)",
    "40/42 (M)",
    "44/46 (L)",
    "48/50 (XL)",
    "52/54 (2XL)",
    "56/58 (3XL)",
  ];
  result = clothesSizes;
  return result;
};

interface IProps {
  sizeType: IProduct["sizeType"];
  sizes: string[];
  onChange: (sizeType: IProduct["sizeType"], sizes: string[]) => void;
}

export default function ({ sizeType, sizes, onChange }: IProps) {
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const v = event.target.value as IProduct["sizeType"];
    onChange(v, getSizes(v));
  };

  const handleClickSize = (size: string) => (e: React.MouseEvent) => {
    if (sizes.indexOf(size) === -1) {
      onChange(sizeType, [...sizes, size]);
    } else {
      onChange(
        sizeType,
        sizes.filter((s) => s !== size)
      );
    }
  };

  return (
    <div style={{ display: "flex", margin: 8, flexDirection: "column" }}>
      <FormControl
        component="fieldset"
        style={{ marginRight: 8, width: "100%" }}
      >
        <FormLabel>Marimi</FormLabel>
        <RadioGroup
          value={sizeType}
          onChange={handleChange}
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <FormControlLabel
            value="universal"
            control={<Radio />}
            label="Universala"
          />
          <FormControlLabel value="hat" control={<Radio />} label="Palarii" />
          <FormControlLabel value="clothes" control={<Radio />} label="Haine" />
        </RadioGroup>
      </FormControl>
      <div
        style={{
          marginTop: 10,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Tooltip placement="top" title="Selecteaza toate marimile">
          <IconButton
            size="small"
            color="primary"
            onClick={() => onChange(sizeType, getSizes(sizeType))}
          >
            <CheckCircleIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip placement="top" title="Sterge toate marimile">
          <IconButton size="small" onClick={() => onChange(sizeType, [])}>
            <HighlightOffIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        {getSizes(sizeType).map((s) => (
          <Chip
            key={s}
            clickable={false}
            variant="outlined"
            size="small"
            label={s}
            className={clsx(classes.chip, {
              [classes.selected]: sizes.indexOf(s) !== -1,
            })}
            onClick={handleClickSize(s)}
          />
        ))}
      </div>
    </div>
  );
}
