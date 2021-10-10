import IOrder from "src/types/IOrder";

export const getOrderStatusLabel = (status: IOrder["status"]) => {
  switch (status) {
    case "placed":
      return "Plasată";
    case "preparing":
      return "Procesată";
    case "sent":
      return "Trimisă";
  }
};
