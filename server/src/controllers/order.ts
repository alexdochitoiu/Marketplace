import Order from "../models/order";
import { Request, Response } from "express";
import log from "../logger";
import sendMail from "../services/sendMail";

const createOrder = (req: Request, res: Response) => {
  const { cart, clientInfo, orderNotes } = req.body;
  console.log(req.body);
  Order.create({
    cart,
    clientInfo,
    orderNotes,
  })
    .then((order) => {
      sendMail({
        to: clientInfo.email,
        subject: `Comanda a fost plasata (Numar comanda: ${order._id})`,
        text: "Comanda a fost plasata",
        html: "Comanda a fost <b>plasata</b>",
      });
      res.status(201).json(order);
    })
    .catch((error) => {
      log.error(error);
      res.status(500).json({ error });
    });
};

const getOrders = (req: Request, res: Response) => {
  Order.find()
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
