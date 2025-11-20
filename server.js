const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Email API
app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.MY_EMAIL,
      subject: `New Portfolio Message from ${name}`,
      text: message,
    });

    res.json({ status: "success" });

  } catch (err) {
    console.log(err);
    res.json({ status: "fail" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});