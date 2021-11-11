import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import React from "react";

export default function () {
  const [value, setValue] = React.useState("ramburs");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  let info = "";
  if (value === "ramburs") {
    info = "Plata se face ramburs la primirea coletului.";
  } else if (value === "transfer") {
    info =
      "Realizarea platii direct în contul nostru bancar. Utilizați codul dvs. de comandă ca referință la plată. Comanda dvs. nu va fi expediată până când fondurile nu au fost procesate în contul nostru.";
  } else {
    info = "Detaliile cardului le veți introduce la următorul pas.";
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", border: "1px solid #555" }}>
      <FormControl component="fieldset">
        <RadioGroup
          name="paying"
          value={value}
          onChange={handleChange}
          className="paying_options_radio_group"
        >
          <FormControlLabel
            value="ramburs"
            control={<Radio color="primary" size="small" />}
            label="Ramburs"
          />
          <FormControlLabel
            value="transfer"
            control={<Radio color="primary" size="small" />}
            label="Transfer bancar"
          />
          {/* <FormControlLabel
            disabled={true}
            value="online"
            control={<Radio color="primary" size="small" />}
            label="Online cu cardul bancar"
          /> */}
        </RadioGroup>
      </FormControl>
      <span
        style={{
          fontFamily: "Poppins, sans-serif",
          fontSize: 13,
          padding: "5px 10px",
          background: "#555",
          color: "#fff",
        }}
      >
        {info}
      </span>
    </div>
  );
}
