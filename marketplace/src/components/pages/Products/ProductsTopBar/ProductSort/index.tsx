import { makeStyles } from "@material-ui/core";
import { sortingOptions } from "src/redux/types";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/redux/types";
import { doChangeProductsSortBy } from "src/redux/actions";
import Select from "src/components/generic/Select";

const useStyles = makeStyles({
  root: {
    marginLeft: 40,
    display: "flex",
    alignItems: "center",
  },
});

export default function () {
  const classes = useStyles();
  const dispatch = useDispatch();
  const sortBy = useSelector((state: RootState) => state.productsSortBy);
  return (
    <div className={classes.root}>
      <h4 style={{ fontFamily: "Oswald, sans-serif", marginRight: 12 }}>
        Sorteaza dupa:
      </h4>
      <Select
        options={[...sortingOptions]}
        value={sortBy}
        onChange={(e) => {
          dispatch(doChangeProductsSortBy(e.target.value as typeof sortBy));
        }}
      />
    </div>
  );
}
