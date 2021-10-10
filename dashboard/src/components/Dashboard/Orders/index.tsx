import {
  Button,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@material-ui/core";
import React from "react";
import IOrder from "src/types/IOrder";
import * as orderService from "src/services/order";
import OrderItem from "./OrderItem";
import Loading from "src/components/shared/Loading";
import OrderUpdateDialog from "./OrderUpdateDialog";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    padding: 15,
    height: "calc(100vh - 80px)",
    overflowY: "auto",
    alignItems: "flex-start",
  },
  container: {
    width: "calc(100% - 20px)",
    display: "flex",
    flexDirection: "column",
  },
  toolbar: {
    padding: 15,
    margin: "10px 0",
    display: "flex",
    alignItems: "center",
  },
});

export default function () {
  const classes = useStyles();
  const [orders, setOrders] = React.useState<IOrder[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [orderToUpdate, setOrderToUpdate] = React.useState<IOrder | null>(null);
  const [searchOrderNumber, setSearchOrderNumber] = React.useState("");
  const [filterStatus, setFilterStatus] = React.useState("");

  React.useEffect(() => {
    setLoading(true);
    orderService.getAll().then(({ data }) => {
      setOrders(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  const handleDelete = (id: string) => {
    orderService.remove(id).then(({ data }) => {
      setOrders(orders.filter((c) => c._id !== data._id));
    });
  };

  const handleEdit = (order: IOrder) => {
    setOrderToUpdate(order);
  };

  const handleDone = (data: Partial<IOrder>) => {
    orderService
      .update({ id: data?._id, status: data.status })
      .then(({ data: updatedOrder }) => {
        setOrders(
          orders.map((o) => (o._id === updatedOrder._id ? updatedOrder : o))
        );
      });
  };

  let displayOrders = orders;
  if (filterStatus) {
    displayOrders = displayOrders.filter((o) => o.status === filterStatus);
  }

  if (searchOrderNumber) {
    displayOrders = displayOrders.filter(
      (o) => o.number.indexOf(searchOrderNumber) !== -1
    );
  }

  return (
    <div className={classes.root}>
      {orderToUpdate && (
        <OrderUpdateDialog
          order={orderToUpdate}
          onClose={() => setOrderToUpdate(null)}
          onDone={handleDone}
        />
      )}
      <div className={classes.container}>
        <Paper elevation={1} className={classes.toolbar}>
          <TextField
            size="small"
            label="Număr comanda"
            variant="outlined"
            value={searchOrderNumber}
            onChange={(e) => setSearchOrderNumber(e.target.value)}
          />
          <FormControl
            style={{ width: 200, marginLeft: 10 }}
            size="small"
            variant="outlined"
          >
            <InputLabel id="status-select">Status comandă</InputLabel>
            <Select
              labelId="status-select"
              value={filterStatus}
              onChange={(e: any) => setFilterStatus(e.target.value)}
              label="Status comandă"
            >
              <MenuItem value="">Toate</MenuItem>
              <MenuItem value="placed">Plasată</MenuItem>
              <MenuItem value="preparing">Procesată</MenuItem>
              <MenuItem value="sent">Trimisă</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            style={{ marginLeft: 10 }}
            onClick={() => {
              setSearchOrderNumber("");
              setFilterStatus("");
            }}
          >
            Resetare filtre
          </Button>
        </Paper>
        {displayOrders.map((o, idx) => (
          <OrderItem
            key={idx}
            order={o}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
}
