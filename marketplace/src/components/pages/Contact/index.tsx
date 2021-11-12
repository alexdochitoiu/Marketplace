import "./Contact.styles.css";
import { ImLocation } from "react-icons/im";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail, MdBusiness } from "react-icons/md";
import { PHONE, MAIL } from "src/constants/contact";
import { Divider } from "@material-ui/core";
import TitleBanner from "src/components/generic/TitleBanner";
import GoogleMap from "./GoogleMap";

export default function () {
  return (
    <div>
      <TitleBanner title="Contact" />
      <div className="container contact">
        <div className="contact-info">
          <h4 className="contact-title">CONTACT</h4>
          <div className="contact-content">
            <a href={`https://api.whatsapp.com/send?phone=${PHONE}`}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <FaPhoneAlt />
                <div>
                  Telefon: <br />
                  {PHONE}
                </div>
              </div>
            </a>
            <div style={{ display: "flex", alignItems: "center" }}>
              <MdEmail />
              <div>
                E-mail: <br />
                {MAIL}
              </div>
            </div>
          </div>
        </div>
        <div className="contact-info">
          <h4 className="contact-title">DATE IDENTIFICARE FIRMĂ</h4>
          <div className="contact-content">
            <div style={{ display: "flex", alignItems: "center" }}>
              <ImLocation />
              <div>
                Locatie: <br />
                Str. A. I. Cuza 11, Bl. 9, Sc. A, Et. 1, Ap. 5 <br />
                Săveni, Botoșani, Romania
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <MdBusiness />
              <div>
                Firmă: MIRAL FASHION LNT S.R.L.
                <br />
                CUI: 45058320
                <br />
                Nr. reg. com.: J7/668/14.10.2021
              </div>
            </div>
          </div>
        </div>
        <Divider style={{ marginTop: 35 }} />
        <div className="contact-info">
          <h4 className="contact-title">CONTACTEAZA-NE</h4>
          <form className="contact-form">
            <div>
              <input type="text" placeholder="Numele tau" />
              <input type="text" placeholder="Email-ul tau" />
            </div>
            <input
              style={{ width: "calc(100% - 20px)" }}
              type="text"
              placeholder="Subiect"
            />
            <textarea
              style={{ width: "calc(100% - 20px)" }}
              rows={12}
              placeholder="Mesaj"
            />
            <input type="submit" value="Trimite" />
          </form>
        </div>
      </div>
      <GoogleMap />
    </div>
  );
}
