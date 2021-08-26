import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import PanoramaIcon from "@material-ui/icons/Panorama";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ConfirmationDialog from "src/components/shared/ConfirmationDialog";
import React from "react";
import IProduct from "src/types/IProduct";
import clsx from "clsx";
import history from "src/constants/history";
import * as routes from "src/constants/routes";
import { computePriceString } from "src/utils";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ProductMenu from "./ProductMenu";

const useStyles = makeStyles({
  root: {
    margin: 5,
    width: 220,
    border: "1px solid #555",
  },
  title: {
    textAlign: "center",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actions: {
    justifyContent: "space-between",
    borderTop: "1px solid #ccc",
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 4,
  },
  promoPrice: {
    fontSize: 12,
    textDecoration: "line-through",
    fontWeight: "normal",
  },
  categoryBox: {
    position: "relative",
    display: "flex",
    padding: "8px 0",
    background: "#555",
    color: "#fff",
    justifyContent: "center",
  },
  optionBtn: {
    position: "absolute",
    right: 2,
    top: "calc(50% - 13px)",
    color: "#fff",
  },
});

interface IProps {
  product: IProduct;
  onDelete: (id: string) => void;
  onEdit: (product: IProduct) => void;
  onDuplicate: (product: IProduct) => void;
}

export default function ({ product, onDelete, onEdit, onDuplicate }: IProps) {
  const classes = useStyles();
  const [deleteConfirmation, setDeleteConfirmation] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isPromo = !!product.sizes.find((s) => s.promoPrice);
  return (
    <Card variant="outlined" className={classes.root}>
      <div className={classes.categoryBox}>
        <Typography variant="body2">
          {product.category?.title || <i>Fara categorie</i>}
        </Typography>
        <IconButton
          className={classes.optionBtn}
          size="small"
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>
        <ProductMenu
          product={product}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          onDuplicate={onDuplicate}
        />
      </div>
      <ConfirmationDialog
        open={deleteConfirmation}
        onClose={() => setDeleteConfirmation(false)}
        title="Sterge articol"
        contentText={
          "Esti sigur ca vrei sa stergi articolul '" + product.title + "'?"
        }
        confirmButtonText="Sterge"
        onConfirm={() => {
          setDeleteConfirmation(false);
          onDelete(product._id);
        }}
      />
      <CardHeader
        title={product.title}
        className={classes.title}
        titleTypographyProps={{ style: { fontSize: 18 } }}
      />
      <Divider />
      <CardContent className={classes.content}>
        <Typography style={{ marginBottom: 8 }} variant="body2">
          Cod produs: <b>{product.productCode}</b>
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="pre"
          style={{ whiteSpace: "pre-wrap", marginBottom: 10 }}
        >
          {product.description.length > 100
            ? `${product.description.slice(0, 100)}...`
            : product.description}
        </Typography>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          {product.images.map((i) => (
            <Avatar
              key={i}
              className={classes.avatar}
              src={i}
              children={<PanoramaIcon />}
            />
          ))}
        </div>
        <div
          style={{
            marginTop: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" style={{ marginTop: 8 }}>
            Pret:{" "}
            <b className={clsx({ [classes.promoPrice]: isPromo })}>
              {computePriceString(product.sizes, "price")}
            </b>{" "}
            {isPromo && (
              <b>{computePriceString(product.sizes, "promoPrice")}</b>
            )}
          </Typography>
          <Typography style={{ marginTop: 8 }} variant="body2">
            Total pe stoc:{" "}
            <b>{product.sizes.reduce((acc, curr) => acc + curr.quantity, 0)}</b>
          </Typography>
          <Chip
            style={{ marginTop: 8 }}
            size="small"
            label={product.sizes.map((s) => s.size).join(", ")}
          />
        </div>
      </CardContent>
      <CardActions className={classes.actions}>
        <IconButton size="small" onClick={() => onEdit(product)}>
          <EditIcon fontSize="small" />
        </IconButton>
        <Button
          color="primary"
          size="small"
          variant="contained"
          onClick={() =>
            history.push(routes.PRODUCT.replace(":productId", product._id))
          }
        >
          Deschide
        </Button>
        <IconButton size="small" onClick={() => setDeleteConfirmation(true)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </CardActions>
    </Card>
  );
}
