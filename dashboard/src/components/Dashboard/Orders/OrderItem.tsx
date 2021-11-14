import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Chip,
  Divider,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import React from "react";
import ConfirmationDialog from "src/components/shared/ConfirmationDialog";
import IOrder from "src/types/IOrder";
import { getOrderStatusLabel } from "src/utils/getOrderStatusLabel";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ItemPrice from "./ItemPrice";

const useStyles = makeStyles({
  content: {
    justifyContent: "space-between",
  },
  box: {
    background: "#efefef",
    border: "1px solid #ddd",
    padding: 8,
    margin: 8,
    flex: 1,
  },
  item: {
    background: "#fff",
    border: "1px solid #ddd",
    margin: "3px 0",
    fontSize: 15,
    padding: 5,
  },
  title: {
    display: "flex",
    alignItems: "center",
    padding: 6,
    background: "#fff",
    border: "1px solid #ddd",
    fontSize: 15,
    color: "#333",
    textTransform: "uppercase",
    "& > svg": {
      marginRight: 8,
    },
  },
});

interface IProps {
  order: IOrder;
  onDelete: (id: string) => void;
  onEdit: (order: IOrder) => void;
}

const getStatusColor = (status) =>
  status === "placed"
    ? "#ff6e00"
    : status === "preparing"
    ? "steelblue"
    : "green";

export default function ({ order, onDelete, onEdit }: IProps) {
  const classes = useStyles();
  const [deleteConfirmation, setDeleteConfirmation] = React.useState(false);
  return (
    <>
      <ConfirmationDialog
        open={deleteConfirmation}
        onClose={() => setDeleteConfirmation(false)}
        title="Sterge comanda"
        contentText={
          "Esti sigur ca vrei sa stergi comanda #" + order.number + "?"
        }
        confirmButtonText="Sterge"
        onConfirm={() => {
          setDeleteConfirmation(false);
          onDelete(order._id);
        }}
      />
      <Accordion
        style={{ borderLeft: `5px solid ${getStatusColor(order.status)}` }}
      >
        <AccordionSummary
          classes={{ content: classes.content }}
          expandIcon={<ExpandMoreIcon />}
        >
          <div className="flex-row" style={{ flexWrap: "wrap" }}>
            <div className="flex-row">
              <Typography variant="body2" style={{ marginRight: 8 }}>
                Comanda:
              </Typography>
              <Chip
                variant="outlined"
                size="small"
                label={`#${order.number}`}
              />
            </div>
            <Divider
              orientation="vertical"
              flexItem={true}
              style={{ margin: "0 10px" }}
            />
            <div className="flex-row">
              <Typography variant="body2" style={{ marginRight: 8 }}>
                Plasată:
              </Typography>
              <Chip
                variant="outlined"
                size="small"
                label={new Date(order.createdAt).toLocaleString("RO")}
              />
            </div>
            <Divider
              orientation="vertical"
              flexItem={true}
              style={{ margin: "0 10px" }}
            />
            <div className="flex-row">
              <Typography variant="body2" style={{ marginRight: 8 }}>
                Total:
              </Typography>
              <Chip
                variant="outlined"
                size="small"
                label={`${order.cartPrice?.totalPrice || 0} RON`}
              />
            </div>
            <Divider
              orientation="vertical"
              flexItem={true}
              style={{ margin: "0 10px" }}
            />
            <div className="flex-row">
              <Typography variant="body2" style={{ marginRight: 8 }}>
                Metoda de plata:
              </Typography>
              <Chip variant="outlined" size="small" label={order.payMethod.toUpperCase()} />
            </div>
          </div>
          <Chip
            size="small"
            style={{
              background: getStatusColor(order.status),
              color: "#fff",
            }}
            label={getOrderStatusLabel(order.status)}
          />
        </AccordionSummary>
        <AccordionDetails style={{ flexDirection: "column" }}>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div className={classes.box}>
              <div className={classes.title}>
                <ShoppingCartIcon fontSize="small" />
                <b>Conținut coș:</b>
              </div>
              {order.cart.map((ci, idx) => (
                <div
                  key={idx}
                  className="flex-row"
                  style={{
                    background: "#fff",
                    justifyContent: "space-between",
                    border: "1px solid #ddd",
                    margin: "3px 0",
                    padding: "0 8px",
                  }}
                >
                  <div
                    style={{ width: 30, marginLeft: 10, textAlign: "center" }}
                  >
                    {idx + 1}.
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", flex: 1 }}
                  >
                    {ci.product && ci.product.images.length > 0 && (
                      <img
                        width="50"
                        height="50"
                        style={{ objectFit: "contain", marginRight: 15 }}
                        src={ci.product.images[0]}
                      />
                    )}
                    <div>
                      <b>
                        {ci.selectedQuantity} x {ci.product.title}
                      </b>
                      <br />
                      <i>Mărime: </i>
                      {ci.selectedSize}
                    </div>
                  </div>
                  <ItemPrice cartItem={ci} />
                  <IconButton size="small" href={`/products/${ci.product._id}`}>
                    <VisibilityIcon fontSize="small" />
                  </IconButton>
                </div>
              ))}
              {order.cartPrice && (
                <div className={classes.item}>
                  <div className="flex-row" style={{ padding: "0 10px" }}>
                    <b>Cost produse</b>
                    <b>{order.cartPrice.totalPrice} RON</b>
                  </div>
                  <div className="flex-row" style={{ padding: "0 10px" }}>
                    <b>Cost livrare</b>
                    <b>{order.cartPrice.shippingFee} RON</b>
                  </div>
                  <div
                    className="flex-row"
                    style={{ background: "#eee", padding: "5px 10px" }}
                  >
                    <b style={{ fontWeight: 600 }}>Total</b>
                    <b style={{ color: "var(--primary)", fontSize: 19 }}>
                      {order.cartPrice.totalPrice + order.cartPrice.shippingFee}{" "}
                      RON
                    </b>
                  </div>
                </div>
              )}
            </div>
            <div className={classes.box}>
              <div className={classes.title}>
                <ContactMailIcon fontSize="small" />
                <b>Informații client:</b>
              </div>
              <div className={classes.item}>
                <div>
                  Nume: <b>{order.clientInfo.lastName}</b>
                </div>
                <div>
                  Prenume: <b>{order.clientInfo.firstName}</b>
                </div>
                <div>
                  Telefon: <b>{order.clientInfo.phone}</b>
                </div>
                <div>
                  Email: <b>{order.clientInfo.email}</b>
                </div>
                <div>
                  Adresă: <b>{order.clientInfo.address}</b>
                </div>
                <div>
                  Cod poștal: <b>{order.clientInfo.zipCode}</b>
                </div>
                <div>
                  Oraș: <b>{order.clientInfo.city}</b>
                </div>
                <div>
                  Județ: <b>{order.clientInfo.county}</b>
                </div>
                <div style={{ flex: 1 }}>
                  Notă comandă: <b>{order.orderNotes || "-"}</b>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              borderTop: "1px solid #ccc",
              paddingTop: 10,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {order.updatedAt !== order.createdAt ? (
              <div className="flex-row">
                <Typography variant="body2" style={{ marginRight: 8 }}>
                  Comandă actualizată la
                </Typography>
                <Chip
                  variant="outlined"
                  size="small"
                  label={new Date(order.updatedAt).toLocaleString("RO")}
                />
              </div>
            ) : (
              <div className="flex-row">
                <Typography variant="body2" style={{ marginRight: 8 }}>
                  Comanda nu a fost încă actualizată
                </Typography>
              </div>
            )}
            <div>
              <Button
                startIcon={<EditIcon fontSize="small" />}
                onClick={() => onEdit(order)}
                variant="contained"
                style={{
                  background: "steelblue",
                  color: "#fff",
                  marginRight: 15,
                }}
              >
                Actualizează
              </Button>
              <Button
                startIcon={<DeleteIcon fontSize="small" />}
                onClick={() => setDeleteConfirmation(true)}
                variant="contained"
                style={{ background: "#e80707", color: "#fff" }}
              >
                Șterge
              </Button>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
