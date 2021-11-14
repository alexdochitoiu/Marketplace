import Order from "../models/order";
import { Request, Response } from "express";
import log from "../logger";
import {
  sendOrderPlacedMail,
  sendOrderProcessedMail,
  sendOrderSentMail,
} from "../services/sendOrderMail";
import { sendNotificationMail } from "../services/sendNotificationMail";
import Product from "../models/product";

const createOrder = (req: Request, res: Response) => {
  const { cart, cartPrice, clientInfo, orderNotes } = req.body;

  if (cart.length === 0) {
    return res.status(400).json({ error: "Cart empty" });
  }

  return Order.create({
    number: `${Math.floor(100000 + Math.random() * 900000)}`,
    status: "placed",
    cart,
    cartPrice,
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
            // process.env.NODE_ENV === "production" &&
            sendOrderPlacedMail(order);
            // process.env.NODE_ENV === "production" &&
            sendNotificationMail({
              orderId: order._id,
              orderNumber: order.number,
              clientFirstName: order.clientInfo.firstName,
              clientLastName: order.clientInfo.lastName,
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
    .sort({ createdAt: "desc" })
    .exec()
    .then((orders) => {
      res.status(200).json(orders);
    })
    .catch((error) => {
      log.error(error);
      res.status(500).json({ error });
    });
};

const getOrder = (req: Request, res: Response) => {
  const { id } = req.params;
  Order.findById(id)
    .populate({
      path: "cart",
      populate: { path: "product", model: "Product" },
    })
    .exec()
    .then((order) => {
      res.status(200).json(order);
    })
    .catch((error) => {
      log.error(error);
      res.status(500).json({ error });
    });
};

const updateOrder = (req: Request, res: Response) => {
  const { id } = req.params;
  const { awb, status } = req.body;
  const invoice = req.file?.filename;
  Order.findByIdAndUpdate(id, { status }, { new: true, omitUndefined: true })
    .then((order) => {
      if (!order) {
        res.status(404).json({ error: "Order not found" });
      } else {
        Order.findById(order._id)
          .populate({
            path: "cart",
            populate: { path: "product", model: "Product" },
          })
          .then((updatedOrder) => {
            if (!updatedOrder) {
              res.status(404).json({ error: "Order not found" });
            } else if (updatedOrder.status === "preparing") {
              // process.env.NODE_ENV === "production" &&
              sendOrderProcessedMail(updatedOrder);
            } else if (updatedOrder.status === "sent") {
              // Update products quantities
              updatedOrder.cart.map((cItem) => {
                const { sizes } = cItem.product;
                const index = sizes.findIndex(
                  (s) => s.size === cItem.selectedSize
                );
                sizes[index].quantity = Math.max(
                  0,
                  sizes[index].quantity - parseInt(cItem.selectedQuantity, 10)
                );
                Product.findByIdAndUpdate(
                  cItem.product._id,
                  { sizes },
                  { new: true, omitUndefined: true }
                ).then((updatedProduct) =>
                  console.log(
                    "Stocul produsului a fost actualizat",
                    updatedProduct
                  )
                );
              });

              // Send mail
              // process.env.NODE_ENV === "production" &&
              sendOrderSentMail(updatedOrder, { awb, invoice });
            }
            res.status(200).json(updatedOrder);
          });
      }
    })
    .catch((error) => {
      log.error(error);
      res.status(500).json({ error });
    });
};

const deleteOrder = (req: Request, res: Response) => {
  const { id } = req.params;
  Order.findByIdAndDelete(id)
    .then((order) => {
      if (order) {
        res.status(200).json(order);
      } else {
        res.status(400).json({ error: "Order not found" });
      }
    })
    .catch((error) => {
      log.error(error);
      res.status(500).json({ error });
    });
};

export default { createOrder, getOrders, getOrder, updateOrder, deleteOrder };
