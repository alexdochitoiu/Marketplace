import { Chip, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import IProduct from "src/types/IProduct";

const useStyles = makeStyles({
  infoBar: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#666",
    color: "#fff",
    paddingTop: 8,
    paddingBottom: 8,
    margin: "8px 0",
  },
  promoPrice: {
    fontSize: 12,
    textDecoration: "line-through",
    fontWeight: "normal",
  },
});

interface IProps {
  product: IProduct;
}

export default function ({ product }: IProps) {
  const classes = useStyles();

  const Price = () => (
    <>
      <b
        style={{ fontSize: 15 }}
        className={clsx({ [classes.promoPrice]: product.promoPrice })}
      >
        {product.price}
      </b>
      {product.promoPrice && (
        <b style={{ fontSize: 16, marginLeft: 8 }}>{product.promoPrice}</b>
      )}
      <span style={{ marginLeft: 8 }}>RON</span>
    </>
  );

  return (
    <div className={classes.infoBar}>
      <Chip
        size="small"
        label={
          <span>
            Articol <b>{product.active ? "activ" : "inactiv"}</b>
          </span>
        }
      />
      <Chip size="small" label={<Price />} />
      <Chip
        size="small"
        label={
          <span>
            Stoc: <b>{product.quantity}</b>
          </span>
        }
      />
    </div>
  );
}
