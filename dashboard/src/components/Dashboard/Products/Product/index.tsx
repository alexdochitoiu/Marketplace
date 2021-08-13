import React from "react";
import { useRouteMatch } from "react-router-dom";
import IProduct from "src/types/IProduct";
import * as productService from "src/services/product";
import history from "src/constants/history";
import * as routes from "src/constants/routes";
import { Chip, IconButton, makeStyles, Typography } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import NoItems from "src/components/shared/NoItems";
import Loading from "src/components/shared/Loading";
import InfoBar from "./InfoBar";
import Images from "./Images";

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
    paddingTop: 10,
    display: "flex",
    alignItems: "center",
  },
  headerTitle: {
    textAlign: "center",
  },
  body: {
    padding: "5px 25px",
  },
});

export default function () {
  const classes = useStyles();
  const router = useRouteMatch<any>();
  const [product, setProduct] = React.useState<IProduct | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const { productId } = router.params;
    if (productId) {
      setLoading(true);
      productService
        .getById(productId)
        .then(({ data }) => {
          setProduct(data);
          setLoading(false);
        })
        .catch((error) => history.push(routes.PRODUCTS));
    }
  }, []);

  if (!product) {
    return (
      <div style={{ display: "flex", height: "calc(100vh - 60px)" }}>
        <NoItems primaryText="Articol indisponibil" />
      </div>
    );
  }

  if (loading) {
    return <Loading text="Articolul se incarca..." />;
  }

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <IconButton onClick={() => history.goBack()}>
          <ArrowBackIcon />
        </IconButton>
        <div style={{ flexGrow: 1 }}>
          <Typography variant="h6" className={classes.headerTitle}>
            {product.title}
          </Typography>
          {product.category && (
            <Typography
              variant="button"
              color="textSecondary"
              component="p"
              style={{ textAlign: "center" }}
            >
              {product.category.title}
            </Typography>
          )}
        </div>
      </div>
      <InfoBar product={product} />
      <div className={classes.body}>
        <Typography variant="caption" style={{ fontWeight: "bold" }}>
          Descriere
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="pre"
          style={{ whiteSpace: "pre-wrap", marginBottom: 10 }}
        >
          {product.description}
        </Typography>
        {product.images.length > 0 && <Images images={product.images} />}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "10px 0",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="caption" style={{ fontWeight: "bold" }}>
              Marimi
            </Typography>
            <div style={{ marginLeft: 10 }}>
              {product.sizes.map((s) => (
                <Chip
                  key={s}
                  size="small"
                  label={s}
                  style={{ margin: "1px 3px" }}
                />
              ))}
            </div>
          </div>
          {product.color && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="caption" style={{ fontWeight: "bold" }}>
                Culoare
              </Typography>
              <div
                style={{
                  marginLeft: 10,
                  width: 150,
                  height: 24,
                  borderRadius: 3,
                  backgroundColor: product.color,
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
