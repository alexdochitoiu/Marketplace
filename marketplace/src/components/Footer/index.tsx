import Logo from "../generic/Logo";
import "./Footer.styles.css";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaPhoneAlt,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FACEBOOK, INSTAGRAM, YOUTUBE } from "src/constants/socialLinks";
import { PHONE, MAIL } from "src/constants/contact";

export default function () {
  return (
    <div className="footer">
      <div className="container flex-row footer-wrapper">
        <div style={{ alignItems: "flex-start" }}>
          <h3>Despre Miral-Fashion</h3>
          <p>
            Bun venit în lumea blănurilor naturale. Descoperă ultimele articole
            din blană naturală de înaltă calitate.
          </p>
          <div className="social-nav-bar">
            <a href={FACEBOOK}>
              <div className="circle-icon-btn">
                <FaFacebookF />
              </div>
            </a>
            <a href={INSTAGRAM}>
              <div className="circle-icon-btn">
                <FaInstagram />
              </div>
            </a>
            <a href={YOUTUBE}>
              <div className="circle-icon-btn">
                <FaYoutube />
              </div>
            </a>
          </div>
        </div>
        <div>
          <Logo />
          <ul className="footer-nav">
            <a href="/produse/section/all">
              <li>Produse</li>
            </a>
            <a href="/favorite">
              <li>Favorite</li>
            </a>
            <a href="/cos-de-cumparaturi">
              <li>Cosul meu</li>
            </a>
            <a href="/checkout">
              <li>Checkout</li>
            </a>
          </ul>
          <div className="copy-right">Copyright © miral-fashion.ro 2021</div>
        </div>
        <div className="more-info">
          <div className="more-info-wrapper">
            <a href={`tel:${PHONE}`}>
              <FaPhoneAlt />
              {PHONE}
            </a>
            <a href={`mailto:${MAIL}`}>
              <MdEmail />
              {MAIL}
            </a>
            <a className="info-link">INFORMATII</a>
            <a href="/contact">CONTACT</a>
            <a href="https://anpc.ro/">ANPC</a>
          </div>
        </div>
      </div>
    </div>
  );
}
