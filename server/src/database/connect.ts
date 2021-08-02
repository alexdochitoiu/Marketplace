import mongoose from "mongoose";
import log from "../logger";

export default function () {
  return mongoose
    .connect(process.env.MONGO_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => {
      log.info("Mongo database connected");
    })
    .catch((error) => {
      log.error(error);
      process.exit(1);
    });
}
