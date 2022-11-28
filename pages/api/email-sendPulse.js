const sendpulse = require("sendpulse-api");
const africastalking = require("africastalking");

const client = africastalking({
  username: process.env.AFRICASTALKING_USERNAME,
  apiKey: process.env.AFRICASTALKING_APIKEY,
});

const API_USER_ID = process.env.SEND_PULSE_ID;
const API_SECRET = process.env.SEND_PULSE_SECRET;
``;
const TOKEN_STORAGE = "/tmp/";

export default function handler(req, res) {
  console.log(req.body);
  var answerGetter = function (data) {
    res.send(data);
  };

  sendpulse.init(API_USER_ID, API_SECRET, TOKEN_STORAGE, function () {
    req.body?.day &&
      req.body?.day.forEach((website, index) => {
        // sending daily emails using sendpulse
        let email = {
          html: `<html><body><h2>Hi ${website.name},</h2>
          I hope that you are well. We are informing you that the website/domain - <b>${website.website_link}</b> is expiring today.
          <br /> To avoid inconveniences, login to <a href="https://shineafrika.com/">www.shineafrika.com</a> and make a renewal payment.
          <br />
          If you require any further assistance, please let us know hello@shineafrika.com.
            <br />
            <br />
            <footer>
              <p>Best regards,</p>
              <p><b>ShineAfrika Team</b></p>
              <a href="https://shineafrika.com/">
                www.shineafrika.com
              </a>
            </footer></body></html>`,
          text: "Kindly update your websites payment to keep it online",
          subject: `${website.name} Expiry Date`,
          from: {
            name: "Ablestate",
            email: "theablestate@gmail.com",
          },
          to: [
            {
              name: "Charles Kasasira",
              email: "charleskasasira01@gmail.com",
            },
          ],
          bcc: [
            {
              name: "Ablestate",
              email: "hello@theablestate.com",
            },
          ],
        };
        sendpulse.smtpSendMail(answerGetter, email);

        // send sms to client
        client.SMS.send({
          to: website.telephone_number,
          message: `Your website ${website.name.toUpperCase()} (${
            website.website_link
          }) will expiry in a day. Please login in to https://shineafrika.com to make payment. If you require any further information, let us know.`,
        })
          .then((response) => res.status(200).json(response))
          .catch((error) => res.status(503).json(error));
      });
  });
}
