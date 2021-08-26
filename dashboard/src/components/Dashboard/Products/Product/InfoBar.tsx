import { Chip, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import IProduct from "src/types/IProduct";
import { computePriceString } from "src/utils";

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

  const isPromo = !!product.sizes.find((s) => s.promoPrice);
  const Price = () => (
    <>
      <b className={clsx({ [classes.promoPrice]: isPromo })}>
        {computePriceString(product.sizes, "price")}
      </b>{" "}
      {isPromo && <b>{computePriceString(product.sizes, "promoPrice")}</b>}
      {" RON"}
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
            Total pe stoc:{" "}
            <b>{product.sizes.reduce((acc, curr) => acc + curr.quantity, 0)}</b>
          </span>
        }
      />
    </div>
  );
}
