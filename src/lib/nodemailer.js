const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "0d80f8293e02b4",
    pass: "33b2de341241c2"
  }
});
 

