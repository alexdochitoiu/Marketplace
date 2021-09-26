import * as React from "react";
import { useRouteMatch } from "react-router-dom";
import IOrder from "src/types/IOrder";
import * as orderService from "src/services/order";
import Button from "src/components/generic/Button";
import { CgNotes } from "react-icons/cg";
import TitleBanner from "src/components/generic/TitleBanner";
import "./style.css";
import { getOrderStatusLabel } from "src/utils/getOrderStatusLabel";
import { convertDate } from "src/utils/convertDate";
import ItemPrice from "../Cart/CartItem/ItemPrice";

export default function () {
  const router = useRouteMatch<any>();
  const { orderId } = router.params;
  const [order, setOrder] = React.useState<IOrder | null>(null);

  React.useEffect(() => {
    if (orderId) {
      orderService.getById(orderId).then(({ data }) => setOrder(data));
    }
  }, []);

  if (!order) {
    return (
      <div
        style={{
          height: "calc(100vh - 300px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: -30,
          background: "#eee",
        }}
      >
        <h4
          style={{
            fontSize: 30,
            color: "#444",
            marginBottom: 15,
            display: "flex",
            alignItems: "center",
          }}
        >
          <CgNotes
            style={{ color: "var(--primary)", fontSize: 50, marginRight: 10 }}
          />{" "}
          Detalii comandă
        </h4>
        <p style={{ fontSize: 18 }}>
          Ne pare rău, dar nu am putut găsi această comandă!
        </p>
        <Button
          href="/produse/section/all"
          text="Înapoi către magazin"
          animation="slide"
          style={{ border: "1px solid #ccc" }}
        />
      </div>
    );
  }

  console.log(order);
  return (
    <div className="order-details">
      <TitleBanner title={`Comanda #${order.number}`} />
      <div className="container" style={{ marginTop: 30 }}>
        <div
          className="flex-row order-box"
          style={{ justifyContent: "space-between" }}
        >
          <div>
            Status comandă:{" "}
            <span className="order-chip">
              {getOrderStatusLabel(order.status)}
            </span>
          </div>
          <div>
            Dată comandă:{" "}
            <span className="order-chip">{convertDate(order.createdAt)}</span>
          </div>
          <div>
            Număr comandă: <span className="order-chip">#{order.number}</span>
          </div>
        </div>
        <div className="order-box">
          {order.cart.map((ci, idx) => (
            <div
              key={idx}
              className="flex-row"
              style={{
                justifyContent: "space-between",
                border: "1px solid #eee",
              }}
            >
              <div style={{ margin: "0 20px" }}>{idx + 1}.</div>
              <div className="flex-row" style={{ flex: 1 }}>
                <img
                  width="80"
                  height="80"
                  style={{ objectFit: "contain", marginRight: 15 }}
                  src={ci.product.images[0]}
                />
                <div>
                  <h4>
                    {ci.selectedQuantity} x {ci.product.title}
                  </h4>
                  <span style={{ fontFamily: "Poppins, sans-serif" }}>
                    Mărime:{" "}
                  </span>
                  {ci.selectedSize}
                </div>
              </div>
              <ItemPrice cartItem={ci} />
            </div>
          ))}
        </div>
        <div className="order-box"></div>
      </div>
    </div>
  );
}
