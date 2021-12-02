import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import logger from './logger';

const sendEmail = async (email: string, url: string) => {
  const transporterOptions: SMTPTransport.Options = {
    host: process.env.SMTP_SERVER,
    port: parseInt(process.env.SMTP_PORT as string) || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(transporterOptions);

  const mailOptions = {
    from: '"Splat Support" <noreply.splat@gmail.com',
    to: email,
    subject: 'Password Reset Request for Splat',
    text: 'Reset password for Splat',
    html: `<a href="${url}">Reset your password using this link ${url}</a>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      logger.error(error);
      return;
    }
    console.log('sent email: ', info);
  });
};

export default sendEmail;
