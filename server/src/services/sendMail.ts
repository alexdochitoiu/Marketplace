import nodemailer from "nodemailer";

const sendMail = async ({ to, subject, text, html, ...rest }) => {
  // const transporter = nodemailer.createTransport({
  //   host: "miral-fashion.ro",
  //   port: 25,
  //   secure: false,
  //   auth: {
  //     user: "root@miral-fashion.ro",
  //     pass: process.env.DASHBOARD_PASSWORD,
  //   },
  //   tls: {
  //     rejectUnauthorized: false,
  //   },
  // });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.DASHBOARD_EMAIL,
      pass: process.env.DASHBOARD_PASSWORD,
    },
  });

  return transporter.sendMail(
    {
      from: `"Miral-Fashion.Ro" <${process.env.DASHBOARD_EMAIL}>`,
      to,
      subject,
      text,
      html,
      ...rest,
    },
    (err, data) => {
      console.log(data);
      if (err) {
        console.log("Mail error: ", err);
      } else {
        console.log("Mail sent successfully!");
      }
    }
  );
};

export default sendMail;
