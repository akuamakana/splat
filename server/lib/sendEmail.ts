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
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: `<a href="${url}">${url}</a>`, // html body
  };

  transporter.sendMail(mailOptions, (_, info) => {
    console.log('sent email: ', info);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
};

export default sendEmail;
