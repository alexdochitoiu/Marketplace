export const HOST =
  process.env.NODE_ENV === "production"
    ? `https://miral-fashion.ro:${process.env.PORT}`
    : `http://localhost:${process.env.PORT}`;
