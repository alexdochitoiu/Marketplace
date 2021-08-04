import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Chip,
  Typography,
} from "@material-ui/core";
import React from "react";

type RadioValueType = "universal" | "hat" | "clothes";

const hatSizes = [53, 61];
const clothesSizes = [32, 52];

const getSizes = (interval: any, hat = true) => {
  let result = [];
  for (let i = interval[0]; i <= interval[1]; i += hat ? 1 : 2) {
    result.push(`${i}`);
  }
  return result;
};

interface IProps {
  sizes: string[];
  onChange: (sizes: string[]) => void;
}

export default function ({ sizes, onChange }: IProps) {
  const [value, setValue] = React.useState<RadioValueType>("universal");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const v = event.target.value as RadioValueType;
    setValue(v);
    switch (v) {
      case "universal":
        onChange(["Universal"]);
        break;
      case "hat":
        onChange(getSizes(hatSizes));
        break;
      case "clothes":
        onChange(getSizes(clothesSizes, false));
        break;
    }
  };

  return (
    <div style={{ display: "flex", margin: 8, flexDirection: "column" }}>
      <FormControl
        component="fieldset"
        style={{ marginRight: 8, width: "100%" }}
      >
        <FormLabel component="legend">Sizes</FormLabel>
        <RadioGroup
          value={value}
          onChange={handleChange}
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <FormControlLabel
            value="universal"
            control={<Radio />}
            label="Universal"
          />
          <FormControlLabel value="hat" control={<Radio />} label="Hat" />
          <FormControlLabel
            value="clothes"
            control={<Radio />}
            label="Clothes"
          />
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
        <Typography variant="body2" style={{ marginRight: 8 }}>
          Selected sizes:
        </Typography>
        {sizes.map((s) => (
          <Chip
            key={s}
            variant="outlined"
            size="small"
            label={s}
            style={{ margin: 2 }}
          />
        ))}
      </div>
    </div>
  );
}
