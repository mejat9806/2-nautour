import nodemailer from 'nodemailer';

export const sendEmail = async (options) => {
  //! 1) create transporter
  const transorter = nodemailer.createTransport({
    // service: 'Gmail',
    // auth: {
    //   user: process.env.EMAIL_USERNAME,
    //   pass: process.env.EMAIL_PASSWORD,
    // },
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
    //Activate in Gmail "less secure app "option or use mailTrap for development
  });
  //! 2) define the email options
  const mailOptions = {
    from: 'amer Aizat <hello@amer.io',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  //! 3) actually send the email
  await transorter.sendMail(mailOptions);
};
