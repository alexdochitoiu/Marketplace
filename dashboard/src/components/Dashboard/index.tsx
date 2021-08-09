import { makeStyles, Theme } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";
import Photos from "./Photos";
import * as routes from "../../constants/routes";
import Categories from "./Categories";
import React from "react";
import AppBar from "./Navigation/AppBar";
import SideDrawer from "./Navigation/SideDrawer";
import {
  DRAWER_CLOSED_WIDTH,
  DRAWER_OPENED_WIDTH,
} from "./Navigation/constants";
import Home from "./Home";
import Products from "./Products";
import Product from "./Products/Product";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: "#ddd",
    height: "100%",
  },
  container: {
    marginLeft: DRAWER_CLOSED_WIDTH,
    transition: theme.transitions.create(["margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  containerShift: {
    marginLeft: DRAWER_OPENED_WIDTH,
    transition: theme.transitions.create(["margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

export default function () {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  return (
    <div className={classes.root}>
      <AppBar open={open} />
      <SideDrawer open={open} onChange={(open) => setOpen(open)} />
      <div className={open ? classes.containerShift : classes.container}>
        <Switch>
          <Route exact={true} path={routes.HOME} component={() => <Home />} />
          <Route
            exact={true}
            path={routes.CATEGORIES}
            component={() => <Categories />}
          />
          <Route
            exact={true}
            path={routes.PRODUCTS}
            component={() => <Products />}
          />
          <Route
            exact={true}
            path={routes.PRODUCT}
            component={() => <Product />}
          />
          <Route
            exact={true}
            path={routes.IMAGES}
            component={() => <Photos />}
          />
        </Switch>
      </div>
    </div>
  );
}
