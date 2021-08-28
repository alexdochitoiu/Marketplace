import { Slider, withStyles } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "src/components/generic/Button";
import { doChangePriceInterval } from "src/redux/actions";
import { RootState } from "src/redux/types";

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
  const dispatch = useDispatch();
  const priceInterval = useSelector((state: RootState) => state.priceInterval);
  const maxPrice = useSelector((state: RootState) => state.maxPrice);
  const [value, setValue] = React.useState([0, 5000]);

  React.useEffect(() => {
    if (maxPrice >= 0) {
      setValue([value[0], maxPrice]);
    }
  }, [maxPrice]);

  React.useEffect(() => {
    if(priceInterval === null) {
      setValue([0, maxPrice]);
    }
  }, [priceInterval])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="sidebar-item">
      <h3 className="sidebar-title">Filtreaza dupa pret</h3>
      <CustomSlider
        value={value}
        step={50}
        min={0}
        max={maxPrice}
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
          onClick={() =>
            dispatch(doChangePriceInterval(value as [number, number]))
          }
        />
        <h4>
          {value[0]} - {value[1]} RON
        </h4>
      </div>
    </div>
  );
}
