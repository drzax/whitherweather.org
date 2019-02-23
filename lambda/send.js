// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
exports.handler = function(event, context, callback) {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const msg = {
    to: "simon@elvery.net",
    from: "hello@whitherweather.org",
    subject: "A weather report",
    text: event.body
  };
  sgMail.send(msg);
  callback(null, {
    statusCode: 200
  });
};
