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

const getValue = (sizes: string[]): RadioValueType => {
  if (sizes.length <= 1) return "universal";
  if (
    sizes[0] === `${hatSizes[0]}` &&
    sizes[sizes.length - 1] === `${hatSizes[1]}`
  )
    return "hat";
  return "clothes";
};

interface IProps {
  sizes: string[];
  onChange: (sizes: string[]) => void;
}

export default function ({ sizes, onChange }: IProps) {
  const [value, setValue] = React.useState<RadioValueType>(getValue(sizes));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const v = event.target.value as RadioValueType;
    setValue(v);
    switch (v) {
      case "universal":
        onChange(["Universala"]);
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
        <FormLabel component="legend">Marimi</FormLabel>
        <RadioGroup
          value={value}
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
        <Typography variant="body2" style={{ marginRight: 8 }}>
          Marimi selectate:
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
