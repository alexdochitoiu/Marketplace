import React from "react";
import { useRouteMatch } from "react-router-dom";
import IProduct from "src/types/IProduct";
import * as productService from "src/services/product";
import history from "src/constants/history";
import * as routes from "src/constants/routes";
import { IconButton, makeStyles, Typography } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles({
  root: {
    width: 800,
    margin: "0 auto",
    background: "white",
    boxShadow:
      "3px 0 5px 0 rgba(0, 0, 0, 0.2), -3px 0 5px 0 rgba(0, 0, 0, 0.2)",
  },
  header: {
    padding: 3,
    display: "flex",
    alignItems: "center",
  },
  headerTitle: {
    flexGrow: 1,
    textAlign: "center",
  },
});

export default function () {
  const classes = useStyles();
  const router = useRouteMatch<any>();
  const [product, setProduct] = React.useState<IProduct | null>(null);

  React.useEffect(() => {
    const { productId } = router.params;
    if (productId) {
      productService
        .getById(productId)
        .then(({ data }) => {
          setProduct(data);
        })
        .catch((error) => history.push(routes.PRODUCTS));
    }
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <IconButton onClick={() => history.goBack()}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" className={classes.headerTitle}>
          {product?.title}
        </Typography>
      </div>
    </div>
  );
}
