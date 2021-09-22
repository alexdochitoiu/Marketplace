import fs from "fs";
import path from "path";
import sendMail from "../sendMail";

export default function ({
  number,
  cart,
  clientInfo,
  orderNotes,
  url,
  orderDetailsUrl,
  shippingFee,
}) {
  const template = fs.readFileSync(
    path.resolve("./src/assets/html/template.html"),
    "utf-8"
  );

  const { product } = cart[0];
  const size = product.sizes.find((s) => s.size === cart[0].selectedSize);
  const price =
    parseInt(cart[0].selectedQuantity, 10) * (size.promoPrice || size.price);

  const totalPrice = price + shippingFee;

  const html = template
    .replace(/{{number}}/g, number)
    .replace(/{{url}}/g, url)
    .replace(/{{orderDetailsUrl}}/g, orderDetailsUrl)
    .replace(/{{selectedQuantity}}/g, cart[0].selectedQuantity)
    .replace(/{{selectedSize}}/g, cart[0].selectedSize)
    .replace(/{{productName}}/g, product.title)
    .replace(/{{price}}/g, `${price}`)
    .replace(/{{shippingFee}}/g, shippingFee)
    .replace(/{{totalPrice}}/g, totalPrice)
    .replace(/{{lastName}}/g, clientInfo.lastName)
    .replace(/{{firstName}}/g, clientInfo.firstName)
    .replace(/{{address}}/g, clientInfo.address)
    .replace(/{{city}}/g, clientInfo.city)
    .replace(/{{county}}/g, clientInfo.county)
    .replace(/{{zipCode}}/g, clientInfo.zipCode)
    .replace(/{{email}}/g, clientInfo.email)
    .replace(/{{phone}}/g, clientInfo.phone)
    .replace(/{{orderNotes}}/g, orderNotes);

  return sendMail({
    to: clientInfo.email,
    subject: `Comanda a fost plasată (Număr comandă: ${number})`,
    text: "",
    html,
  });
}
