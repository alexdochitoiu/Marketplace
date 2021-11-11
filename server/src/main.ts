import "dotenv-safe/config";
import path from "path";
import fs from "fs";
import https from "https";
import express, { Request, Response } from "express";
import cors from "cors";
import connectDatabase from "./database/connect";
import log from "./logger";
import categoryRoutes from "./routes/category";
import dashboardRoutes from "./routes/dashboard";
import productRoutes from "./routes/product";
import photoRoutes from "./routes/photo";
import orderRoutes from "./routes/order";

const allowedOrigins = [
  "http://localhost:8000",
  "http://localhost:3000",

  "http://89.46.7.46",
  "http://89.46.7.46:81",
  "http://miral-fashion.ro",
  "http://www.miral-fashion.ro",
  "http://miral-fashion.ro:81",
  "http://www.miral-fashion.ro:81",

  "https://89.46.7.46",
  "https://89.46.7.46:81",
  "https://miral-fashion.ro",
  "https://www.miral-fashion.ro",
  "https://miral-fashion.ro:81",
  "https://www.miral-fashion.ro:81",
];

const port = parseInt(process.env.PORT!);
const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/health-check", (req: Request, res: Response) =>
  res.sendStatus(200)
);

connectDatabase();

app.use("/public", express.static(path.join(__dirname, "../public")));
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/photo", photoRoutes);
app.use("/api/order", orderRoutes);

let server;
if (process.env.NODE_ENV === "development") {
  server = app.listen(port, () => {
    log.info(`DEVELOPMENT: Marketpalce Server listening on port ${port} ...`);
  });
} else {
  server = https
    .createServer(
      {
        key: fs.readFileSync(path.resolve("./dist/cert/cert.key")),
        cert: fs.readFileSync(path.resolve("./dist/cert/cert.pem")),
      },
      app
    )
    .listen(port, () => {
      log.info(`PRODUCTION: Marketpalce Server listening on port ${port} ...`);
    });
}
export default server;
