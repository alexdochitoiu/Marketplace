import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  makeStyles,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import React from "react";
import { GrClose } from "react-icons/gr";

const useStyles = makeStyles({
  detailsBtn: {
    border: "1px solid #aaa",
    cursor: "pointer",
    padding: "2px 5px",
    transition: "0.15s all ease-in-out",
    background: "#444",
    "&:hover": {
      background: "#fff",
      color: "var(--primary)",
    },
  },
  title: {
    position: "relative",
    padding: 20,
    fontSize: 24,
    textAlign: "center",
    color: "var(--primary)",
    background: "#f0f0f0",
  },
  closeIcon: {
    position: "absolute",
    cursor: "pointer",
    right: 15,
    top: 15,
    stroke: "#444",
    background: "#fff",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      "& > path": {
        stroke: "#fff",
      },
      background: "var(--primary)",
    },
  },
});

export default function () {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("ramburs");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  let info: any = "";
  if (value === "ramburs") {
    info = "Plata se face ramburs la primirea coletului.";
  } else if (value === "transfer") {
    info = (
      <span>
        Realizarea platii direct în contul nostru bancar. Utilizați codul dvs.
        de comandă ca referință la plată. Comanda dvs. nu va fi expediată până
        când fondurile nu au fost procesate în contul nostru.
        <br />
        <br />
        <span className={classes.detailsBtn} onClick={() => setOpen(true)}>
          Detalii cont bancar
        </span>
        <Dialog
          fullWidth={true}
          open={open}
          onClose={() => setOpen(false)}
        >
          <h4 className={classes.title}>
            <GrClose
              className={classes.closeIcon}
              onClick={() => setOpen(false)}
            />
            Cont bancar
          </h4>
          <DialogContent
            style={{ borderTop: "1px solid #ddd" }}
            className="terms_and_cond_content"
          >
            <h4>Cont:</h4>
            <p>RO40BTRLRONCRT0CE9057601</p>
            <h4>Titular</h4>
            <p>MIRAL FASHION LNT S.R.L.</p>
            <h4>CUI</h4>
            <p>45058320</p>
          </DialogContent>
        </Dialog>
      </span>
    );
  } else {
    info = "Detaliile cardului le veți introduce la următorul pas.";
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid #555",
      }}
    >
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
