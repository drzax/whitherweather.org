const { google } = require("googleapis");

const sheets = google.sheets("v4");

async function store(data) {
  const spreadsheetId = process.env.GOOGLE_API_SHEET_ID;
  const range = process.env.GOOGLE_API_RANGE;

  return new Promise((resolve, reject) => {
    //authenticate request
    authorise().then(auth => {
      sheets.spreadsheets.values.append(
        {
          auth,
          spreadsheetId,
          range,
          valueInputOption: "RAW",
          resource: {
            values: [data]
          }
        },
        (err, res) => {
          if (err) return reject(err);
          resolve(res);
        }
      );
    }, reject);
  });
}

async function authorise() {
  const client = new google.auth.JWT(
    process.env.GOOGLE_API_CLIENT_EMAIL,
    null,
    process.env.GOOGLE_API_PRIVATE_KEY.replace(/\\n/g, "\n"),
    ["https://www.googleapis.com/auth/spreadsheets"]
  );

  return new Promise((resolve, reject) => {
    client.authorize(function(err, tokens) {
      if (err) {
        return reject(err);
      }
      resolve(client);
    });
  });
}

exports.handler = function(event, context, callback) {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const report = JSON.parse(event.body);

  store([
    report.now,
    report.content,
    report.latitude,
    report.longitude,
    report.locationText,
    report.customLocationText
  ]).then(
    () => {
      callback(null, {
        statusCode: 200,
        body: "ok"
      });
    },
    err => {
      callback(null, { statusCode: 500, body: err.message });
    }
  );
};
