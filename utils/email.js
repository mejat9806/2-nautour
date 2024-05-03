import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import pug from 'pug';
import { htmlToText } from 'html-to-text';

export class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Amer Aizat <${process.env.EMAIL_FROM}>`;
  }

  createNewTransport() {
    if (process.env.NODE_ENV === 'production') {
      return nodemailer.createTransport({
        host: process.env.BREVO_HOST,
        port: process.env.BREVO_PORT,
        secure: false,
        auth: {
          user: process.env.BREVO_LOGIN,
          pass: process.env.BREVO_KEY,
        },
      });
    }
    if (process.env.NODE_ENV === 'development') {
      return nodemailer.createTransport({
        host: process.env.MAILTRAP_HOST,
        port: process.env.MAILTRAP_PORT,
        auth: {
          user: process.env.MAILTRAP_USER,
          pass: process.env.MAILTRAP_PASS,
        },
        //Activate in Gmail "less secure app "option or use mailTrap for development
      });
    }
  }

  async send(template, subject) {
    // send the actual email
    //1 render the html for the html based on the pug template
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const templatePath = path.resolve(
      __dirname,
      '..',
      'views',
      'emails',
      `${template}.pug`,
    );
    const html = pug.renderFile(templatePath, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });
    //2 defined email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: subject,
      html,
      // eslint-disable-next-line react/react-in-jsx-scope
      text: htmlToText(html),
    };

    //3 create a transport
    await this.createNewTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send(`welcome`, `Welcome to my app`);
  }

  async sendPasswordReset() {
    await this.send(
      `passwordReset`,
      'Your Password reset valid for 10 minutes',
    );
  }
}
//const sendEmail = async (options) => {
//! 1) create transporter
// const transorter = nodemailer.createTransport({
//   // service: 'Gmail',
//   // auth: {
//   //   user: process.env.EMAIL_USERNAME,
//   //   pass: process.env.EMAIL_PASSWORD,
//   // },
//   host: process.env.MAILTRAP_HOST,
//   port: process.env.MAILTRAP_PORT,
//   auth: {
//     user: process.env.MAILTRAP_USER,
//     pass: process.env.MAILTRAP_PASS,
//   },
//   //Activate in Gmail "less secure app "option or use mailTrap for development
// });
//! 2) define the email options
// const mailOptions = {
//   from: 'amer Aizat <hello@amer.io',
//   to: options.email,
//   subject: options.subject,
//   text: options.message,
// };
//! 3) actually send the email
//  await transorter.sendMail(mailOptions);
//};
