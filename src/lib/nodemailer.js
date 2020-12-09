const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "6fce5a8bcdbe95",
      pass: "1f79ea6e8b5d17"
    }
  });