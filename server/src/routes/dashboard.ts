import express, { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  if (
    [process.env.DASHBOARD_USER, process.env.DASHBOARD_EMAIL].includes(
      username
    ) &&
    password === process.env.DASHBOARD_PASSWORD
  ) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET_KEY!, {
      expiresIn: "8h",
    });
    res.status(200).json({ token });
  } else {
    res.status(401).json({
      message: "Date de autentificare incorecte",
    });
  }
});

export = router;
