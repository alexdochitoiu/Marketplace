export const HOST = `http://${
  process.env.NODE_ENV === "production" ? "89.46.7.46" : "localhost"
}:${process.env.PORT}`;
