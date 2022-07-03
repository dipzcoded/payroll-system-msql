import nodemailer from "nodemailer";
import mailGun from "nodemailer-mailgun-transport";
import pug from "pug";
import htmlToText from "html-to-text";
import { fileURLToPath } from "url";
import { dirname } from "path";

class Email {
  constructor(userObj, url) {
    this.to = userObj.user.email;
    this.name = userObj.user.name;
    this.password = userObj.password || "";
    this.url = url;
    this.from = `HR <hr@payroll>`;
  }

  newTransport() {
    const auth = {
      auth: {
        api_key: process.env.MAILGUN_API,
        domain: process.env.MAILGUN_DOMAIN,
      },
    };

    if (process.env.NODE_ENV === "production") {
      // Sendgrid Transporter
      return nodemailer.createTransport(mailGun(auth));
    }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      // Activate in gmail "less secure app" option
    });
  }

  async send(template, subject, company = "") {
    //1. Render the html based on pug template
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const html = pug.renderFile(
      `${__dirname}/../email/templates/${template}.pug`,
      {
        name: this.name,
        url: this.url,
        password: this.password,
        subject,
        company,
      }
    );

    // 2. Define the email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html),
    };

    // 3. Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome(company) {
    await this.send("welcome", `Welcome to the ${company} Family!`, company);
  }

  async sendPasswordReset(company) {
    await this.send(
      "passwordReset",
      "Your password reset token(valid for only 15 minutes)",
      company
    );
  }
}

export default Email;
