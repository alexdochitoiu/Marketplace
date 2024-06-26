import fs from "fs";
import path from "path";
import { HOST } from "../config";
import sendMail from "./sendMail";

const logo = HOST + "/public/assets/logo_x80.png";
export function sendNotificationMail({
  orderNumber,
  orderId,
  clientLastName,
  clientFirstName,
}) {
  const template = fs.readFileSync(
    path.resolve(
      process.env.NODE_ENV === "production"
        ? "./dist/assets/html/newOrderPlaced.html"
        : "./src/assets/html/newOrderPlaced.html"
    ),
    "utf-8"
  );

  const url =
    process.env.NODE_ENV === "production"
      ? "https://miral-fashion.ro"
      : "http://localhost:8000";
  const dashboardUrl =
    process.env.NODE_ENV === "production"
      ? "http://admin.miral-fashion.ro"
      : "http://localhost:3000";
  const brand = process.env.BRAND_NAME!;

  const html = template
    .replace(/{{number}}/g, orderNumber)
    .replace(/{{logo}}/g, logo)
    .replace(/{{url}}/g, url)
    .replace(/{{orderDetailsUrl}}/g, `${url}/comanda/${orderId}`)
    .replace(/{{dashboardUrl}}/g, dashboardUrl)
    .replace(/{{lastName}}/g, clientLastName)
    .replace(/{{firstName}}/g, clientFirstName);

  return sendMail({
    to:
      process.env.NODE_ENV === "production"
        ? process.env.NOTIFICATION_EMAIL
        : "dokee15@gmail.com",
    subject: `${brand} | ${clientLastName} ${clientFirstName} a facut o comandă (#${orderNumber})`,
    text: "",
    html,
  });
}
