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
          <br /> To avoid inconveniences, make Payment via Airtel Money +256756085187, or MM +256771 561682. You can as well login and make a renewal payment.
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
        }) will expiry in a day. Please make payment on +256756085187 / +256771 561682 to keep it running. If you require any further information, please let us know.`,
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
          <br /> To avoid inconveniences, make Payment via Airtel Money +256756085187, or MM +256771 561682. You can as well login and make a renewal payment.
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
        }) will expiry in a week. Please make payment on +256756085187 / +256771 561682 to keep it running. If you require any further information, please let us know.`,
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
          <br /> To avoid inconveniences, make Payment via Airtel Money +256756085187, or MM +256771 561682. You can as well login and make a renewal payment.
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
        }) will expiry in a month. Please make payment on +256756085187 / +256771 561682 to keep it running. If you require any further information, please let us know.`,
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
          <br /> To avoid inconveniences, make Payment via Airtel Money +256756085187, or MM +256771 561682. You can as well login and make a renewal payment.
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
        }) will expiry in a 60 days. Please make payment on +256756085187 / +256771 561682 to keep it running. If you require any further information, please let us know.`,
      })
        .then((response) => res.status(200).json(response))
        .catch((error) => res.status(503).json(error));
    });
}
