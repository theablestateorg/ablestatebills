const africastalking = require("africastalking");

const { SendMailClient } = require("zeptomail");

const url = "api.zeptomail.com/";
const token = process.env.ZOHO_TOKEN;

let zeptoClient = new SendMailClient({ url, token });

const client = africastalking({
  username: process.env.AFRICASTALKING_USERNAME,
  apiKey: process.env.AFRICASTALKING_APIKEY,
});

export default function handler(req, res) {
  // SENDING EMAIL
  console.log(req.body);

  try {
    req.body?.day &&
      req.body?.day.forEach((website, index) => {
        zeptoClient
          .sendMail({
            bounce_address: "info@bounce.shineafrika.com",
            from: {
              address: "noreply@shineafrika.com",
              name: "Shine Afrika",
            },
            to: [
              {
                email_address: {
                  address: website.email,
                  // name: "Charles",
                },
              },
            ],
            subject: `${website.name} Expiry Date`,
            textbody: "Kindly update your websites payment to keep it online",
            htmlbody: `<html><body><h2>Hi ${website.name},</h2>
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
            track_clicks: true,
            track_opens: true,
          })
          .then()
          .catch();

        client.SMS.send({
          // to: `+256${website.telephone_number}`,
          to: website.telephone_number,
          message: `Your website ${website.name.toUpperCase()} (${
            website.website_link
          }) will expiry in a day. Please login in to https://shineafrika.com to make payment. If you require any further information, let us know.`,
        })
          .then((response) => res.status(200).json(response))
          .catch((error) => res.status(503).json(error));
      });

    req.body?.week &&
      req.body?.week.forEach((website, index) => {
        zeptoClient
          .sendMail({
            bounce_address: "info@bounce.shineafrika.com",
            from: {
              address: "noreply@shineafrika.com",
              name: "Shine Afrika",
            },
            to: [
              {
                email_address: {
                  address: website.email,
                  // name: "Charles",
                },
              },
            ],
            subject: `${website.name} Expiry Date`,
            textbody: "Kindly update your websites payment to keep it online",
            htmlbody: `<html><body><h2>Hi ${website.name},</h2>
          I hope that you are well. We are informing you that the website/domain - <b>${website.website_link}</b> is expiring in a week.
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
            track_clicks: true,
            track_opens: true,
          })
          .then()
          .catch();

        client.SMS.send({
          // to: `+256${website.telephone_number}`,
          to: website.telephone_number,
          message: `Your website ${website.name.toUpperCase()} (${
            website.website_link
          }) will expiry in a week. Please login in to https://shineafrika.com to make payment. If you require any further information, let us know.`,
        })
          .then((response) => res.status(200).json(response))
          .catch((error) => res.status(503).json(error));
      });

    req.body?.month &&
      req.body?.month.forEach((website, index) => {
        zeptoClient
          .sendMail({
            bounce_address: "info@bounce.shineafrika.com",
            from: {
              address: "noreply@shineafrika.com",
              name: "Shine Afrika",
            },
            to: [
              {
                email_address: {
                  address: website.email,
                  // name: "Charles",
                },
              },
            ],
            subject: `${website.name} Expiry Date`,
            textbody: "Kindly update your websites payment to keep it online",
            htmlbody: `<html><body><h2>Hi ${website.name},</h2>
          I hope that you are well. We are informing you that the website/domain - <b>${website.website_link}</b> is expiring in a month.
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
            track_clicks: true,
            track_opens: true,
          })
          .then()
          .catch();

        client.SMS.send({
          // to: `+256${website.telephone_number}`,
          to: website.telephone_number,
          message: `Your website ${website.name.toUpperCase()} (${
            website.website_link
          }) will expiry in a month. Please login in to https://shineafrika.com to make payment. If you require any further information, let us know.`,
        })
          .then((response) => res.status(200).json(response))
          .catch((error) => res.status(503).json(error));
      });

    req.body?.two_months &&
      req.body?.two_months.forEach((website, index) => {
        zeptoClient
          .sendMail({
            bounce_address: "info@bounce.shineafrika.com",
            from: {
              address: "noreply@shineafrika.com",
              name: "Shine Afrika",
            },
            to: [
              {
                email_address: {
                  address: website.email,
                  // name: "Charles",
                },
              },
            ],
            subject: `${website.name} Expiry Date`,
            textbody: "Kindly update your websites payment to keep it online",
            htmlbody: `<html><body><h2>Hi ${website.name},</h2>
          I hope that you are well. We are informing you that the website/domain - <b>${website.website_link}</b> is expiring in 60 days.
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
            track_clicks: true,
            track_opens: true,
          })
          .then()
          .catch();

        client.SMS.send({
          to: website.telephone_number,
          message: `Your website ${website.name.toUpperCase()} (${
            website.website_link
          }) will expiry in a 60 days. Please login in to https://shineafrika.com to make payment. If you require any further information, let us know.`,
        })
          .then((response) => res.status(200).json(response))
          .catch((error) => res.status(503).json(error));
      });
    res.send({ message: null });
  } catch (error) {
    console.log(error);
    res.send({ error: error.message });
  }
}
