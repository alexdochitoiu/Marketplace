import Button from "src/components/generic/Button";
import TitleBanner from "src/components/generic/TitleBanner";
import { FaAddressCard } from "react-icons/fa";
import { MdContactMail } from "react-icons/md";
import { CgNotes } from "react-icons/cg";
import "./styles.css";
import OrderSummary from "./OrderSummary";
import TermsAndConditions from "./TermsAndConditions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/redux/types";
import { Redirect } from "react-router";
import { BiErrorAlt } from "react-icons/bi";
import React from "react";
import * as orderService from "src/services/order";
import useTotalCartPrice from "src/utils/customHooks/useTotalCartPrice";
import history from "src/constants/history";
import { doChangeCart } from "src/redux/actions";
import { ImInfo } from "react-icons/im";
import PayOption from "./PayOption";
import { isValidEmail } from "src/utils/isValidEmail";

interface IFormError {
  field: string;
  message: string;
}

export default function () {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const [payMethod, setPayMethod] = React.useState("ramburs");
  const [form, setForm] = React.useState({
    lastName: "",
    firstName: "",
    phone: "",
    email: "",
    county: "",
    city: "",
    address: "",
    zipCode: "",
    orderNotes: "",
  });
  const [termsAccepted, setTermsAccepted] = React.useState(false);
  const [errors, setErrors] = React.useState<IFormError[]>([]);
  const cartPrice = useTotalCartPrice({ cart });

  if (cart.length === 0) {
    return <Redirect to="/cos-de-cumparaturi" />;
  }

  const DisplayError = ({ field }) => {
    const err = errors.find((e) => e.field === field);
    return err ? (
      <span
        className="flex-row"
        style={{ color: "red", fontSize: 12, margin: "0 4px" }}
      >
        <BiErrorAlt style={{ fontSize: 16, marginRight: 6 }} />
        {err.message}
      </span>
    ) : null;
  };

  const handleDone = () => {
    const err: IFormError[] = [];
    if (!termsAccepted) {
      err.push({
        field: "termsAndConditions",
        message:
          "Te rog citește și acceptă termenii și condițiile pentru a putea plasa comanda",
      });
    }
    Object.keys(form).map((k) => {
      const notRequired = ["orderNotes", "zipCode"];
      if (form[k].length === 0 && notRequired.indexOf(k) === -1) {
        err.push({
          field: k,
          message: `Acest câmp este obligatoriu!`,
        });
      }
    });
    if (err.length === 0) {
      const { orderNotes, ...clientInfo } = form;
      const body = {
        cart: cart.map(({ productId, ...c }) => ({
          ...c,
          product: productId,
        })),
        cartPrice,
        clientInfo,
        orderNotes,
        payMethod,
      };
      orderService
        .create(body)
        .then(({ data }) => {
          history.push(`/comanda/${data._id}?success=1`);
          dispatch(doChangeCart([]));
        })
        .catch((err) => alert("A aparut o eroare!"));
    }
    setErrors(err);
  };

  const handleFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setErrors(errors.filter((err) => err.field !== e.target.name));
    if (e.target.name === "email" && !isValidEmail(e.target.value)) {
      setErrors([
        ...errors,
        {
          field: "email",
          message: "Adresa de e-mail introdusă nu este validă!",
        },
      ]);
    }
  };

  const handleTermsAcceptedChange = (e) => {
    setTermsAccepted(e.target.checked);
    setErrors(errors.filter((e) => e.field !== "termsAndConditions"));
  };

  return (
    <div className="checkout">
      <TitleBanner title="Plasare comandă" />
      <div
        className="container"
        style={{
          marginTop: 20,
          display: "flex",
          flex: "1 1",
        }}
      >
        <div style={{ flex: "65%", margin: "0 6px" }}>
          <h4 className="contact-title" style={{ marginBottom: 20 }}>
            Date facturare
          </h4>
          <form className="contact-form checkout-form">
            <label className="flex-row">
              <FaAddressCard
                style={{ width: 20, height: 20, marginRight: 8 }}
              />
              Persoana de contact
            </label>
            <div>
              <div className="input-box">
                <input
                  type="text"
                  value={form.lastName}
                  name="lastName"
                  onChange={handleFormChange}
                  placeholder="Nume *"
                />
                <span className="custom-label">Nume *</span>
                <DisplayError field="lastName" />
              </div>
              <div className="input-box">
                <input
                  type="text"
                  value={form.firstName}
                  name="firstName"
                  onChange={handleFormChange}
                  placeholder="Prenume *"
                />
                <span className="custom-label">Prenume *</span>
                <DisplayError field="firstName" />
              </div>
            </div>
            <div>
              <div className="input-box">
                <input
                  type="text"
                  value={form.phone}
                  name="phone"
                  onChange={handleFormChange}
                  placeholder="Telefon *"
                />
                <span className="custom-label">Telefon *</span>
                <DisplayError field="phone" />
              </div>
              <div className="input-box">
                <input
                  type="text"
                  value={form.email}
                  name="email"
                  onChange={handleFormChange}
                  placeholder="Email *"
                />
                <span className="custom-label">Email *</span>
                <DisplayError field="email" />
              </div>
            </div>
            <label className="flex-row" style={{ marginTop: 15 }}>
              <MdContactMail
                style={{ width: 20, height: 20, marginRight: 8 }}
              />
              Adresa de facturare
            </label>
            <div>
              <div className="input-box">
                <input
                  type="text"
                  value={form.county}
                  name="county"
                  onChange={handleFormChange}
                  placeholder="Județ *"
                />
                <span className="custom-label">Județ *</span>
                <DisplayError field="county" />
              </div>
              <div className="input-box">
                <input
                  type="text"
                  value={form.city}
                  onChange={handleFormChange}
                  name="city"
                  placeholder="Localitate *"
                />
                <span className="custom-label">Localitate *</span>
                <DisplayError field="city" />
              </div>
            </div>
            <div>
              <div className="input-box">
                <input
                  type="text"
                  value={form.address}
                  name="address"
                  onChange={handleFormChange}
                  placeholder="Adresă *"
                />
                <span className="custom-label">Adresă *</span>
                <DisplayError field="address" />
              </div>
              <div className="input-box">
                <input
                  type="text"
                  value={form.zipCode}
                  name="zipCode"
                  onChange={handleFormChange}
                  placeholder="Cod poștal"
                />
                <span className="custom-label">Cod poștal</span>
                <DisplayError field="zipCode" />
              </div>
            </div>
            <label className="flex-row" style={{ marginTop: 15 }}>
              <CgNotes style={{ width: 20, height: 20, marginRight: 8 }} />
              Note comandă
            </label>
            <textarea
              style={{ width: "calc(100% - 20px)" }}
              rows={12}
              value={form.orderNotes}
              name="orderNotes"
              onChange={handleFormChange}
              placeholder="Note comandă (opțional)"
            />
            <p
              style={{
                marginLeft: 10,
                fontSize: 13,
                color: "#666",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              * câmpuri obligatorii
            </p>
          </form>
        </div>
        <div style={{ flex: "35%", margin: "0 6px" }}>
          <h4 className="contact-title" style={{ marginBottom: 20 }}>
            COMANDA TA
          </h4>
          <div
            style={{
              padding: 10,
              border: "1px solid #ccc",
              background: "#fff",
            }}
          >
            <OrderSummary />
            <PayOption
              value={payMethod}
              onChange={(e) => setPayMethod(e.target.value)}
            />
            <TermsAndConditions
              value={termsAccepted}
              onChange={handleTermsAcceptedChange}
            />
            <DisplayError field="termsAndConditions" />
            <Button
              style={{
                border: "1px solid #ccc",
                padding: "12px 20px",
                width: "calc(100% - 40px)",
                textAlign: "center",
                background: "#444",
                color: "#fff",
                marginTop: 10,
              }}
              animation="slide"
              text="Plasează comanda"
              onClick={handleDone}
            />
          </div>
          <div className="confidentialitate-info">
            <ImInfo style={{ fontSize: 11, marginRight: 3 }} />
            Datele personale vor fi folosite pentru a procesa comanda, pentru
            a-ți susține experiența pe acest magazin online și pentru alte
            scopuri descrise în{" "}
            <a href="/informatii/politica-de-confidentialitate">
              politică de confidențialitate
            </a>
            .
          </div>
        </div>
      </div>
    </div>
  );
}
