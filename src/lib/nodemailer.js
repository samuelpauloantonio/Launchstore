const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "ea6d786ac58f20",
    pass: "edf013d2fb46f4"
    }
  });

