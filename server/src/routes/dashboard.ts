import express, { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  if (
    username === process.env.DASHBOARD_USER &&
    password === process.env.DASHBOARD_PASSWORD
  ) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET_KEY!, {
      expiresIn: "2h",
    });
    res.status(200).json({ token });
  } else {
    res.status(401).json({
      message: "Incorrect username or password",
    });
  }
});

export = router;
