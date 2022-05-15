import express from "express";
import bodyParser from "body-parser";

const app = express();

const msg = "Hello world";
const msg2 = "Error";

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "exemplo@gmail.com",
    pass: "exemplo",
  },
});

app.use(express.urlencoded());

app.post("/hook", (req: Request, res: Response, next: NextFunction) => {
  const {
    origin,
    api_key,
    trans_paymentmethod,
    trans_status,
    cus_email,
    cus_name,
    cus_cel,
    product_name,
  } = req.body;

  if (
    (trans_status === "3" && origin === "api-key-orbita") ||
    api_key === "testWebhook"
  ) {
    const mailOptions = {
      from: '"Nome da Empresa" exemplo@gmail.com',
      to: cus_email, 
      subject: "Assunto para o e-mail + nome do produto - " + product_name,
      text: "Mensagem + nome do produto " + product_name,
    };
    transporter.sendMail(mailOptions, function (error: any, info: any) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    console.log(req.body); // Call your action on the request here
    res.status(200).end(msg); // Responding is important
  } else {
    if (
      (trans_status === "1" && origin === "api-key-orbita") ||
      api_key === "testWebhook"
    ) {
      const mailOptions = {
        from: '"NuSolutions a solução na palma da mão" exemplo@gmail.com',
        to: cus_email, 
        subject: "Assunto para o e-mail + nome do produto - " + product_name,
        text: "Mensagem + nome do produto " + product_name,
      };
      transporter.sendMail(mailOptions, function (error: any, info: any) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent2: " + info.response);
        }
      });
      console.log(req.body); // Call your action on the request here
      res.status(200).end(msg); // Responding is important
    } else {
      console.log(req.body); // Call your action on the request here
      res.status(400).end(msg2);
    }
  }
});

app.listen(5000, () => console.log("express listening at port 5000!"));
