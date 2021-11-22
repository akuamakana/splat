import * as nodemailer from 'nodemailer';

const sendEmail = async (email: string, url: string) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'sq7thzxqdez35djy@ethereal.email', // generated ethereal user
      pass: 'Uu2jRB9JYkvnhTZHF8', // generated ethereal password
    },
  });

  const mailOptions = {
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: email, // list of receivers
    subject: 'Password Reset Request for Splat', // Subject line
    text: 'Reset password for Splat', // plain text body
    html: `<a href="${url}">Reset your password using this link ${url}</a>`, // html body
  };

  transporter.sendMail(mailOptions, (_, info) => {
    console.log('sent email: ', info);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
};

export default sendEmail;
