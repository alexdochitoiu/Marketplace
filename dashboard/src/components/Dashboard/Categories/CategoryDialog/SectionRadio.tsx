import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";

export default function ({ value, onChange }) {
  return (
    <FormControl
      component="fieldset"
      style={{ marginRight: 8, marginTop: 10, width: "100%" }}
    >
      <FormLabel>Secțiune</FormLabel>
      <RadioGroup
        value={value}
        onChange={onChange}
        style={{ flexDirection: "row", justifyContent: "space-between" }}
      >
        <FormControlLabel value="men" control={<Radio />} label="Bărbați" />
        <FormControlLabel value="women" control={<Radio />} label="Femei" />
        <FormControlLabel value="kids" control={<Radio />} label="Copii" />
        <FormControlLabel value="other" control={<Radio />} label="Altele" />
      </RadioGroup>
    </FormControl>
  );
}
