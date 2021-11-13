import mongoose from "mongoose";
import log from "../logger";

export default function () {
  const mongoUri =
    process.env.NODE_ENV === "production" || true
      ? "mongodb+srv://miral-dbuser:GJEkZBOfXL22WUYb@cluster0.tnmqw.mongodb.net/miral-db-prod?retryWrites=true&w=majority"
      : "mongodb+srv://miral-dbuser:GJEkZBOfXL22WUYb@cluster0.tnmqw.mongodb.net/miral-db-test?retryWrites=true&w=majority";
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
