import fs from "fs";
import path from "path";
import { HOST } from "../config";
import sendMail from "./sendMail";

const logo = HOST + "/public/assets/logo_x80.png";
export function sendOutOfStockMail({
  productId,
  productTitle,
  outOfStockSize,
}) {
  const template = fs.readFileSync(
    path.resolve(
      process.env.NODE_ENV === "production"
        ? "./dist/assets/html/outOfStockProduct.html"
        : "./src/assets/html/outOfStockProduct.html"
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
  const productUrl = `${url}/produs/${productId}`;
  const html = template
    .replace(/{{logo}}/g, logo)
    .replace(/{{url}}/g, url)
    .replace(/{{productTitle}}/g, productTitle)
    .replace(/{{outOfStockSize}}/g, outOfStockSize)
    .replace(/{{productUrl}}/g, productUrl)
    .replace(/{{dashboardUrl}}/g, dashboardUrl);

  return sendMail({
    to:
      process.env.NODE_ENV === "production"
        ? process.env.NOTIFICATION_EMAIL
        : "dokee15@gmail.com",
    subject: `${brand} | Stoc 0 pentru produsul ${productTitle}`,
    text: "",
    html,
  });
}
