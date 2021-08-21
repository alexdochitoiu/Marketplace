import { makeStyles, MenuItem, Select } from "@material-ui/core";
import { sortingOptions } from "src/redux/types";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/redux/types";
import { doChangeProductsSortBy } from "src/redux/actions";

const useStyles = makeStyles({
  root: {
    marginLeft: 40,
    display: "flex",
    alignItems: "center",
  },
  selectRoot: {
    padding: "5px 15px",
  }
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
        variant="outlined"
        value={sortBy}
        onChange={(e) => {
          dispatch(doChangeProductsSortBy(e.target.value as typeof sortBy));
        }}
        classes={{
          root: classes.selectRoot
        }}
      >
        {sortingOptions.map((o) => (
          <MenuItem key={o.value} value={o.value}>
            {o.label}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}
