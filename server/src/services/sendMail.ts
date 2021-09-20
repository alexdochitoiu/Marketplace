import nodemailer from "nodemailer";

const sendMail = async ({ to, subject, text, html }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.DASHBOARD_EMAIL,
      pass: process.env.DASHBOARD_PASSWORD,
    },
  });

  return transporter.sendMail({
    from: process.env.DASHBOARD_EMAIL,
    to,
    subject,
    text,
    html,
  });
};

export default sendMail;
