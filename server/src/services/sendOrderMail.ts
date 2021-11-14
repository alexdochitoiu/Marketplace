import fs from "fs";
import path from "path";
import { HOST } from "../config";
import { OrderDocument } from "src/models/order";
import sendMail from "./sendMail";

const logo = HOST + "/public/assets/logo_x80.png";

export function sendOrderPlacedMail(order: OrderDocument) {
  const template = fs.readFileSync(
    path.resolve(
      process.env.NODE_ENV === "production"
        ? "./dist/assets/html/orderPlacedMailTemplate.html"
        : "./src/assets/html/orderPlacedMailTemplate.html"
    ),
    "utf-8"
  );

  const url =
    process.env.NODE_ENV === "production"
      ? "http://miral-fashion.ro"
      : "http://localhost:8000";
  const brand = process.env.BRAND_NAME!;

  const cartItemTr = `
    <tr>
      <td>{{index}}</td>
      <td><img src="{{productImgSrc}}" width="70" height="70"
          style="object-fit: contain; border: 1px solid #888; background-color: #fff; margin: 0 15px" /></td>
      <td style="width: 100%">
        <h4>{{selectedQuantity}} x {{productName}}</h4>
        <h4>Mărime: {{selectedSize}}</h4>
      </td>
      <td>
        <h4 style="font-family: Poppins, sans-serif; white-space: nowrap;">{{price}} RON</h4>
      </td>
    </tr>
  `;

  const cartTableContent = order.cart
    .map((item, index) => {
      const { product } = item;
      const size = product.sizes.find((s) => s.size === item.selectedSize);
      const price =
        parseInt(item.selectedQuantity, 10) * (size.promoPrice || size.price);
      return cartItemTr
        .replace(/{{index}}/g, `${index + 1}`)
        .replace(/{{productImgSrc}}/g, item.product.images[0])
        .replace(/{{selectedQuantity}}/g, item.selectedQuantity)
        .replace(/{{productName}}/g, item.product.title)
        .replace(/{{selectedSize}}/g, item.selectedSize)
        .replace(/{{price}}/g, `${price}`);
    })
    .join("\n");

  const html = template
    .replace(/{{number}}/g, order.number)
    .replace(/{{logo}}/g, logo)
    .replace(/{{url}}/g, url)
    .replace(/{{orderDetailsUrl}}/g, `${url}/comanda/${order._id}`)
    .replace(/{{cartTableContent}}/g, cartTableContent)
    .replace(/{{shippingFee}}/g, `${order.cartPrice.shippingFee}`)
    .replace(
      /{{totalPrice}}/g,
      `${order.cartPrice.totalPrice + order.cartPrice.shippingFee}`
    )
    .replace(/{{lastName}}/g, order.clientInfo.lastName)
    .replace(/{{firstName}}/g, order.clientInfo.firstName)
    .replace(/{{address}}/g, order.clientInfo.address)
    .replace(/{{city}}/g, order.clientInfo.city)
    .replace(/{{county}}/g, order.clientInfo.county)
    .replace(/{{zipCode}}/g, order.clientInfo.zipCode)
    .replace(/{{email}}/g, order.clientInfo.email)
    .replace(/{{phone}}/g, order.clientInfo.phone)
    .replace(/{{orderNotes}}/g, order.orderNotes || "-");

  return sendMail({
    to: order.clientInfo.email,
    subject: `${brand} | Comanda #${order.number} a fost înregistrată`,
    text: "",
    html,
  });
}

export function sendOrderProcessedMail(order: OrderDocument) {
  const template = fs.readFileSync(
    path.resolve(
      process.env.NODE_ENV === "production"
        ? "./dist/assets/html/orderProcessedMailTemplate.html"
        : "./src/assets/html/orderProcessedMailTemplate.html"
    ),
    "utf-8"
  );

  const url =
    process.env.NODE_ENV === "production"
      ? "http://miral-fashion.ro"
      : "http://localhost:8000";
  const brand = process.env.BRAND_NAME!;

  const html = template
    .replace(/{{number}}/g, order.number)
    .replace(/{{logo}}/g, logo)
    .replace(/{{url}}/g, url)
    .replace(/{{orderDetailsUrl}}/g, `${url}/comanda/${order._id}`)
    .replace(/{{lastName}}/g, order.clientInfo.lastName)
    .replace(/{{firstName}}/g, order.clientInfo.firstName);

  return sendMail({
    to: order.clientInfo.email,
    subject: `${brand} | Comanda dvs. #${order.number} a fost procesată`,
    text: "",
    html,
  });
}

export function sendOrderSentMail(order: OrderDocument, { awb, invoice }) {
  const template = fs.readFileSync(
    path.resolve(
      process.env.NODE_ENV === "production"
        ? "./dist/assets/html/orderSentMailTemplate.html"
        : "./src/assets/html/orderSentMailTemplate.html"
    ),
    "utf-8"
  );

  const url =
    process.env.NODE_ENV === "production"
      ? "http://miral-fashion.ro"
      : "http://localhost:8000";
  const brand = process.env.BRAND_NAME!;

  const cartItemTr = `
    <tr>
      <td>{{index}}</td>
      <td><img src="{{productImgSrc}}" width="70" height="70"
          style="object-fit: contain; border: 1px solid #888; background-color: #fff; margin: 0 15px" /></td>
      <td style="width: 100%">
        <h4>{{selectedQuantity}} x {{productName}}</h4>
        <h4>Mărime: {{selectedSize}}</h4>
      </td>
      <td>
        <h4 style="font-family: Poppins, sans-serif; white-space: nowrap;">{{price}} RON</h4>
      </td>
    </tr>
  `;

  const cartTableContent = order.cart
    .map((item, index) => {
      const { product } = item;
      const size = product.sizes.find((s) => s.size === item.selectedSize);
      const price =
        parseInt(item.selectedQuantity, 10) * (size.promoPrice || size.price);
      return cartItemTr
        .replace(/{{index}}/g, `${index + 1}`)
        .replace(/{{productImgSrc}}/g, item.product.images[0])
        .replace(/{{selectedQuantity}}/g, item.selectedQuantity)
        .replace(/{{productName}}/g, item.product.title)
        .replace(/{{selectedSize}}/g, item.selectedSize)
        .replace(/{{price}}/g, `${price}`);
    })
    .join("\n");

  const html = template
    .replace(/{{number}}/g, order.number)
    .replace(/{{logo}}/g, logo)
    .replace(/{{url}}/g, url)
    .replace(
      /{{invoiceMessage}}/g,
      invoice ? "Regăsiți factura în secțiunea de atașamente!" : ""
    )
    .replace(/{{orderDetailsUrl}}/g, `${url}/comanda/${order._id}`)
    .replace(/{{cartTableContent}}/g, cartTableContent)
    .replace(/{{shippingFee}}/g, `${order.cartPrice.shippingFee}`)
    .replace(
      /{{totalPrice}}/g,
      `${order.cartPrice.totalPrice + order.cartPrice.shippingFee}`
    )
    .replace(/{{lastName}}/g, order.clientInfo.lastName)
    .replace(/{{firstName}}/g, order.clientInfo.firstName)
    .replace(/{{address}}/g, order.clientInfo.address)
    .replace(/{{city}}/g, order.clientInfo.city)
    .replace(/{{county}}/g, order.clientInfo.county)
    .replace(/{{zipCode}}/g, order.clientInfo.zipCode)
    .replace(/{{email}}/g, order.clientInfo.email)
    .replace(/{{phone}}/g, order.clientInfo.phone)
    .replace(/{{orderNotes}}/g, order.orderNotes || "-")
    .replace(/{{awb}}/g, awb || "-");

  return sendMail({
    to: order.clientInfo.email,
    subject: `${brand} | Comanda dvs. #${order.number} a fost trimisă`,
    text: "",
    html,
    attachments: invoice
      ? [
          {
            filename: invoice,
            path: path.resolve("./public/invoices/" + invoice),
            contentType: "application/pdf",
          },
        ]
      : [],
  });
}
