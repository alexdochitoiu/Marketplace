import { makeStyles, Typography } from "@material-ui/core";
import AssignmentLateIcon from "@material-ui/icons/AssignmentLate";

interface IProps {
  primaryText: string;
  secondaryText?: JSX.Element;
}

const useStyles = makeStyles({
  root: {
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: { width: 120, height: 120, color: "#b9b9b9" },
});

export default function (props: IProps) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AssignmentLateIcon className={classes.icon} />
      <Typography variant="h4" style={{ color: "grey" }}>
        {props.primaryText}
      </Typography>
      {props.secondaryText && (
        <Typography variant="button" style={{ display: "flex" }}>
          {props.secondaryText}
        </Typography>
      )}
    </div>
  );
}
