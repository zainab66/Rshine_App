const mg = require ('mailgun-js');


const mailgun = () =>
  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMIAN,
  });

  module.exports = mailgun;
