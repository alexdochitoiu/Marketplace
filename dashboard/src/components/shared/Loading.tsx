import { CircularProgress, makeStyles, Typography } from "@material-ui/core";
import AssignmentLateIcon from "@material-ui/icons/AssignmentLate";

interface IProps {
  text?: string;
}

const useStyles = makeStyles({
  root: {
    height: "calc(100vh - 60px)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(0, 0, 0, .25)",
  },
});

export default function (props: IProps) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress />
      <Typography style={{ marginTop: 10 }} variant="button">
        {props.text}
      </Typography>
    </div>
  );
}
