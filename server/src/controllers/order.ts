import Order from "../models/order";
import { Request, Response } from "express";
import log from "../logger";
import sendOrderPlacedMail from "../services/sendOrderPlacedMail";

const createOrder = (req: Request, res: Response) => {
  const { cart, clientInfo, orderNotes } = req.body;

  if (cart.length === 0) {
    return res.status(400).json({ error: "Cart empty" });
  }

  return Order.create({
    number: `${Math.floor(100000 + Math.random() * 900000)}`,
    status: "placed",
    cart,
    clientInfo,
    orderNotes,
  })
    .then((response) => {
      Order.findById(response._id)
        .populate({
          path: "cart",
          populate: { path: "product", model: "Product" },
        })
        .then((order) => {
          if (order) {
            sendOrderPlacedMail({
              number: order.number,
              cart: order.cart,
              clientInfo: order.clientInfo,
              orderNotes: order.orderNotes || "-",
              url: "#",
              orderDetailsUrl: "#",
              shippingFee: 50,
            });
            res.status(201).json(order);
          } else {
            res.status(404).json({ error: "Order not found" });
          }
        });
    })
    .catch((error) => {
      log.error(error);
      res.status(500).json({ error });
    });
};

const getOrders = (req: Request, res: Response) => {
  Order.find()
    .populate({
      path: "cart",
      populate: { path: "product", model: "Product" },
    })
    .exec()
    .then((orders) => {
      res.status(200).json(orders);
    })
    .catch((error) => {
      log.error(error);
      res.status(500).json({ error });
    });
};

export default { createOrder, getOrders };
