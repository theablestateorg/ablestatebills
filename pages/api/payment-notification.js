const africastalking = require("africastalking");
const { SendMailClient } = require("zeptomail");

const url = "api.zeptomail.com/";
const token = process.env.ZEPTOMAIL_TOKEN;

let zeptoClient = new SendMailClient({ url, token });

const client = africastalking({
  username: process.env.AFRICASTALKING_USERNAME,
  apiKey: process.env.AFRICASTALKING_APIKEY,
});

export default function handler(req, res) {
  req.body.notifiers &&
    req.body.notifiers.forEach((manager, index) => {
      zeptoClient.sendMail({
        bounce_address: "bounces@client.ablestate.cloud",
        from: {
          address: "team@ablestate.cloud",
          name: "Team Ablestate Cloud",
        },
        to: [
          {
            email_address: {
              address: manager.email,
            },
          },
        ],
        subject: `Payment for ${req.body.product}`,
        textbody: `${req.body.actor} has made payment for ${req.body.product}`,
        htmlbody: `<html><body>
      <b>${req.body.actor}</b> has made payment of ugx <b>${req.body.amount}</b> for ${req.body.product}
            <br />
            <br />
            <footer>
              <p>Best regards,</p>
              <p><b>ShineAfrika Team</b></p>
              <a href="https://ablestate.cloud/">
                www.ablestate.cloud
              </a>
            </footer></body></html>`,
        track_clicks: true,
        track_opens: true,
      });

      client.SMS.send({
        to: manager.contact_number,
        message: `${req.body.actor} has made payment of ${req.body.amount} for ${req.body.product}`,
      })
        .then()
        .catch();
    });

  res.status(200).send({ name: "" });
}
