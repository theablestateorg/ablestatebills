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
          I hope that you are well. I am contacting you on behalf of shineAfrika. We noticed that your website <b>(${website.website_link})</b> will expire <b>today</b>. Payment can be made on these numbers +256756085187 / +256771 561682 to make sure that it stays up and running and remind to tell us the reason for the payment. If you require any further information, please let us know hello@shineafrika.com.
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
          I hope that you are well. I am contacting you on behalf of shineAfrika. We noticed that your website <b>(${website.website_link})</b> will expire in a <b>week</b>. Payment can be made on these numbers +256756085187 / +256771 561682 to make sure that it stays up and running and remind to tell us the reason for the payment. If you require any further information, please let us know hello@shineafrika.com.
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
          I hope that you are well. I am contacting you on behalf of shineAfrika. We noticed that your website <b>(${website.website_link})</b> will expire in a <b>month</b>. Payment can be made on these numbers +256756085187 / +256771 561682 to make sure that it stays up and running and remind to tell us the reason for the payment. If you require any further information, please let us know hello@shineafrika.com.
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
          I hope that you are well. I am contacting you on behalf of shineAfrika. We noticed that your website <b>(${website.website_link})</b> will expire in a <b>60 days</b>. Payment can be made on these numbers +256756085187 / +256771 561682 to make sure that it stays up and running and remind to tell us the reason for the payment. If you require any further information, please let us know hello@shineafrika.com.
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
