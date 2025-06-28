import nodemailer from "nodemailer";
import ejs, { Template } from "ejs";
import path from "path";
import dotenv from "dotenv";
import { tryCatchWrapper } from "./tryCatchWrapper.js";

dotenv.config({ path: "./.env" });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PASS,
  },
});

export const sendMail = tryCatchWrapper(
  async ({ to, subject, templateName, data }) => {
    const templatePath = path.join(
      process.cwd(),
      "templates",
      `${templateName}.ejs`
    );
    const html = await ejs.renderFile(templatePath, data);

    const mailOptions = {
      from: `"Zip Grocer" <${process.env.MAIL_ID}>`, // Name + email
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
  }
);
