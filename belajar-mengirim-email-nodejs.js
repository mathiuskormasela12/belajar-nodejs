const mail = require('nodemailer');

const transporter = mail.createTransport({
  service: 'gmail',
  auth: {
    user: 'samdicova@gmail.com',
    pass: 'avramiv4'
  }
});

// const mailOpt = {
//   from: 'samdicova@gmail.com',
//   to: 'mathiuskormasela12@gmail.com',
//   subject: 'Belajar Mengirim Email dengan Node Js',
//   text: 'Yey Berhasil'
// };

const mailOpt = {
    from: 'samdicova@gmail.com',
    to: 'mathiuskormasela12@gmail.com',
    subject: 'Belajar Mengirim Email dengan Node Js',
    html: '<h1>Hello World</h1>'
  };
 transporter.sendMail(mailOpt, (err, info) => {
   if(err) {
     console.log(err);
   } else {
     console.log(info.response)
   }
 });
