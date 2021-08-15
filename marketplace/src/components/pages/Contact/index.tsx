import "./Contact.styles.css";
import { ImLocation } from "react-icons/im";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { PHONE, MAIL } from "src/constants/contact";
import { Divider } from "@material-ui/core";
import TitleBanner from "src/components/generic/TitleBanner";

export default function () {
  return (
    <div>
      <TitleBanner title="Contact" />
      <div className="container contact">
        <div className="contact-info">
          <h4 className="contact-title">CONTACT</h4>
          <div className="contact-content">
            <div>
              <ImLocation />
              <div>
                Locatie: <br />
                Iasi, Romania
              </div>
            </div>
            <div>
              <FaPhoneAlt />
              <div>
                Telefon: <br />
                {PHONE}
              </div>
            </div>
            <div>
              <MdEmail />
              <div>
                E-mail: <br />
                {MAIL}
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
    </div>
  );
}
