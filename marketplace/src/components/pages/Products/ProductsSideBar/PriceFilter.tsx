import { Slider, withStyles } from "@material-ui/core";
import React from "react";
import Button from "src/components/generic/Button";

const CustomSlider = withStyles({
  valueLabel: {
    top: -25,
    "& *": {
      background: "transparent",
      color: "#000",
      textAlign: "center",
    },
  },
})(Slider);

export default function () {
  const [value, setValue] = React.useState<number[]>([100, 8000]);

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <div className="sidebar-item">
      <h3 className="sidebar-title">Filtreaza dupa pret</h3>
      <CustomSlider
        value={value}
        step={50}
        min={0}
        max={10000}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="price-slider"
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          animation="fade"
          text="Filtreaza"
          style={{
            padding: "12px 10px",
            marginTop: 0,
            border: "1px solid #ccc",
          }}
        />
        <h4>
          {value[0]} - {value[1]} RON
        </h4>
      </div>
    </div>
  );
}
