import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import log from "../logger";

export default function (req: Request, res: Response, next: NextFunction) {
  try {
    const auth = req.headers.authorization;
    if (auth) {
      const token = auth.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!);
      // @ts-ignore
      req.user = decoded;
      next();
    } else {
      res.status(400).json({ message: "Token not provided" });
    }
  } catch (error) {
    log.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
