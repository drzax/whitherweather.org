// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
exports.handler = function(event, context, callback) {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const report = JSON.parse(event.body);

  const msg = {
    to: "simon@elvery.net",
    from: "hello@whitherweather.org",
    subject: `A weather report from ${report.customLocationText ||
      report.locationText ||
      "an unknown location"}`,
    text: `${report.content}

Sent at: ${report.now}
Coordinates: ${report.coordinates}
`
  };
  sgMail.send(msg);
  callback(null, {
    statusCode: 200
  });
};
