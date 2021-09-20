import "dotenv-safe/config";
import express, { Request, Response } from "express";
import cors from "cors";
import connectDatabase from "./database/connect";
import log from "./logger";
import categoryRoutes from "./routes/category";
import dashboardRoutes from "./routes/dashboard";
import productRoutes from "./routes/product";
import photoRoutes from "./routes/photo";
import orderRoutes from "./routes/order";

const port = parseInt(process.env.PORT!);
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/health-check", (req: Request, res: Response) =>
  res.sendStatus(200)
);

connectDatabase();

app.use("/public", express.static("public"));
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/photo", photoRoutes);
app.use("/api/order", orderRoutes);

const server = app.listen(port, () => {
  log.info(`Marketpalce Server listening on port ${port} ...`);
});

export default server;
