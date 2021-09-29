import * as React from "react";
import { useRouteMatch } from "react-router-dom";
import IOrder from "src/types/IOrder";
import * as orderService from "src/services/order";
import Button from "src/components/generic/Button";
import { CgNotes, CgPhone } from "react-icons/cg";
import TitleBanner from "src/components/generic/TitleBanner";
import "./style.css";
import { getOrderStatusLabel } from "src/utils/getOrderStatusLabel";
import { convertDate } from "src/utils/convertDate";
import ItemPrice from "../Cart/CartItem/ItemPrice";
import { FaCheckCircle, FaRegAddressCard } from "react-icons/fa";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { GrNotes } from "react-icons/gr";

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

  return (
    <div className="order-details">
      <TitleBanner title={`Comanda #${order.number}`} />

      <div className="container" style={{ marginTop: 30 }}>
        {location.search && (
          <div className="order-box" style={{ margin: "30px 0" }}>
            <h4
              className="flex-row"
              style={{ fontSize: 30, justifyContent: "center" }}
            >
              <FaCheckCircle style={{ marginRight: 15, color: "green" }} />
              Comanda a fost plasată cu succes!
            </h4>
          </div>
        )}
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
                margin: "3px 0",
              }}
            >
              <div style={{ width: 30, marginLeft: 10, textAlign: "center" }}>
                {idx + 1}.
              </div>
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
          <div
            className="total-price-root"
            style={{
              flexDirection: "column",
              border: "1px solid #eee",
              margin: "3px 0",
              marginLeft: "auto",
              width: 400,
              fontSize: 15,
              padding: 5,
            }}
          >
            <div className="flex-row">
              <h4>Cost produse</h4>
              <h4>{order.cartPrice.totalPrice} RON</h4>
            </div>
            <div className="flex-row">
              <h4>Cost livrare</h4>
              <h4>{order.cartPrice.shippingFee} RON</h4>
            </div>
            <div className="flex-row" style={{ background: "#eee" }}>
              <h4 style={{ fontWeight: 600 }}>Total</h4>
              <h4 style={{ color: "var(--primary)", fontSize: 19 }}>
                {order.cartPrice.totalPrice + order.cartPrice.shippingFee} RON
              </h4>
            </div>
          </div>
        </div>
        <div className="order-box">
          <div className="order-client-info-row">
            <h4 className="flex-row">
              <BiUserCircle style={{ marginRight: 10 }} />
              Destinatar:{" "}
            </h4>
            <h4 style={{ fontFamily: "Poppins, sans-serif" }}>
              {order.clientInfo.lastName} {order.clientInfo.firstName}
            </h4>
          </div>
          <div className="order-client-info-row" style={{ background: "#eee" }}>
            <h4 className="flex-row">
              <FaRegAddressCard style={{ marginRight: 10 }} />
              Adresă:{" "}
            </h4>
            <h4 style={{ fontFamily: "Poppins, sans-serif" }}>
              {order.clientInfo.address}, {order.clientInfo.city},{" "}
              {order.clientInfo.county}, {order.clientInfo.zipCode}
            </h4>
          </div>
          <div className="order-client-info-row">
            <h4 className="flex-row">
              <CgPhone style={{ marginRight: 10 }} />
              Telefon:{" "}
            </h4>
            <h4 style={{ fontFamily: "Poppins, sans-serif" }}>
              {order.clientInfo.phone}
            </h4>
          </div>
          <div className="order-client-info-row" style={{ background: "#eee" }}>
            <h4 className="flex-row">
              <AiOutlineMail style={{ marginRight: 10 }} />
              Email:{" "}
            </h4>
            <h4 style={{ fontFamily: "Poppins, sans-serif" }}>
              {order.clientInfo.email}
            </h4>
          </div>
          <div className="order-client-info-row">
            <h4 className="flex-row">
              <GrNotes style={{ marginRight: 10 }} />
              Notă comandă
            </h4>
            <h4 style={{ fontFamily: "Poppins, sans-serif" }}>
              {order.orderNotes || "-"}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
