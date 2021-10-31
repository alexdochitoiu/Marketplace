import mongoose from "mongoose";
import log from "../logger";

export default function () {
  const mongoUri =
    process.env.NODE_ENV === "production"
      ? "mongodb://miral-database:27017/marketplace-dev"
      : "mongodb://localhost:27017/marketplace-dev";
  return mongoose
    .connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => {
      log.info("Mongo database connected");
    })
    .catch((error) => {
      log.error(error);
      process.exit(1);
    });
}
