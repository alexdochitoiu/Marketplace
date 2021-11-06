import { IconButton, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { ICartItem } from "src/redux/types";
import IProduct from "src/types/IProduct";
import CloseIcon from "@material-ui/icons/Close";
import { AiOutlineFrown } from "react-icons/ai";
import * as productService from "src/services/product";
import SelectQuantity from "../../Product/SelectQuantity";
import ItemPrice from "./ItemPrice";
import FavoriteButton from "./FavoriteButton";
import { getSectionLabel } from "src/utils";

const useStyles = makeStyles({
  root: {
    marginTop: 8,
    marginBottom: 8,
    padding: 15,
    border: "1px solid #ddd",
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    display: "flex",
    flex: 1,
  },
  title: {
    color: "var(--primary)",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      color: "#000",
    },
  },
  category: {
    fontSize: 13,
    color: "#666",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      color: "#000",
    },
  },
});

interface IProps {
  item: ICartItem;
  onRemove: (id: string) => void;
  onChangeQuantity: (id: string, e) => void;
}

export default function ({ item, onRemove, onChangeQuantity }: IProps) {
  const classes = useStyles();
  const [product, setProduct] = React.useState<IProduct | null>(null);

  React.useEffect(() => {
    productService.getById(item.productId).then(({ data }) => {
      setProduct(data);
    });
  }, []);

  return (
    <div className={classes.root}>
      {!product ? (
        <h3 className="flex-row">
          <AiOutlineFrown fontSize="22" style={{ marginRight: 10 }} />
          Produsul nu mai este disponibil
        </h3>
      ) : (
        <div className={classes.content}>
          <a className={classes.title} href={`/produs/${product._id}`}>
            <img
              width="120"
              height="160"
              style={{ objectFit: "contain" }}
              src={product.images[0]}
              className="cart-item-image"
            />
          </a>
          <div
            style={{
              margin: "0 15px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              flex: 1,
            }}
          >
            <div>
              <a className={classes.title} href={`/produs/${product._id}`}>
                <h4>{product.title}</h4>
              </a>
              {product.category && (
                <div className="flex-row">
                  <a
                    className={classes.category}
                    href={`/produse/section/${product.category.section}`}
                  >
                    {getSectionLabel(product.category.section).toUpperCase()}
                  </a>
                  <span style={{ color: "#555", margin: "0 6px" }}>/</span>
                  <a
                    className={classes.category}
                    href={`/produse/${product.category._id}`}
                  >
                    {product.category.title.toUpperCase()}
                  </a>
                </div>
              )}
            </div>
            <div className="flex-row">
              <SelectQuantity
                size="small"
                value={item.selectedQuantity}
                onChange={(e) => onChangeQuantity(item.id, e)}
              />
              <h5>
                <span style={{ color: "#444" }}>Mărime: </span>
                {item.selectedSize}
              </h5>

              <FavoriteButton productId={item.productId} />
            </div>
          </div>
          <ItemPrice cartItem={{ ...item, product }} />
        </div>
      )}
      <Tooltip title="Șterge produsul din coșul de cumpărături">
        <IconButton
          size="small"
          color="default"
          onClick={() => onRemove(item.id)}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </div>
  );
}
