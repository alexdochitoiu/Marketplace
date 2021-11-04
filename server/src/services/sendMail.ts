import nodemailer from "nodemailer";

const sendMail = async ({ to, subject, text, html }) => {
  const transporter = nodemailer.createTransport({
    host: "miral-fashion.ro",
    port: 25,
    secure: false,
    auth: {
      user: "root@miral-fashion.ro",
      pass: process.env.DASHBOARD_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  return transporter.sendMail({
    from: `"Miral-Fashion.Ro" <${process.env.DASHBOARD_EMAIL}>`,
    to,
    subject,
    text,
    html,
  });
};

export default sendMail;
