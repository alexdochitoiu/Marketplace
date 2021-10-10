import { makeStyles } from "@material-ui/core";
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
});

export default function () {
  const classes = useStyles();
  const [orders, setOrders] = React.useState<IOrder[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [orderToUpdate, setOrderToUpdate] = React.useState<IOrder | null>(null);

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

  return (
    <div className={classes.root}>
      <OrderUpdateDialog
        order={orderToUpdate}
        onClose={() => setOrderToUpdate(null)}
        onDone={handleDone}
      />
      <div className={classes.container}>
        {orders.map((o, idx) => (
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
