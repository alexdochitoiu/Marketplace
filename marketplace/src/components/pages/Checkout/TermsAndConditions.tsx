import { FormControlLabel, Checkbox, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    background: "transparent !important",
    "& > span": {
      lineHeight: 1,
    },
  },
  label: { fontSize: 12, textTransform: "none", lineHeight: 1 },
  link: {
    fontWeight: "bold",
    color: "#555",
    "&:hover": {
      color: "var(--primary)",
    },
  },
});

export default function () {
  const classes = useStyles();
  return (
    <>
      <FormControlLabel
        className={classes.root}
        control={
          <Checkbox
            // checked={state.checkedB}
            // onChange={handleChange}
            size="small"
            name="terms"
            color="primary"
          />
        }
        label={
          <span className={classes.label}>
            Am citit şi sunt de acord cu{" "}
            <a className={classes.link}>Termenii şi condiţiile</a> magazinului
            online *
          </span>
        }
      />
    </>
  );
}
