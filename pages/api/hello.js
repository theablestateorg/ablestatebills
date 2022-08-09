// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const africastalking = require("africastalking");
require("dotenv").config();
const nodemailer = require("nodemailer");

const client = africastalking({
  username: process.env.AFRICASTALKING_USERNAME,
  apiKey: process.env.AFRICASTALKING_APIKEY,
});

export default function handler(req, res) {
  // SENDING EMAIL
  const transporter = nodemailer.createTransport({
    service: "zoho",
    auth: {
      user: "charleskasasira@zohomail.com",
      pass: process.env.ZOHOPASS,
    },
  });

  req.body?.day &&
    req.body?.day.forEach((website, index) => {
      transporter.sendMail(
        {
          from: {
            name: "Charles",
            address: "charleskasasira@zohomail.com",
          },
          to: website.email,
          subject: `${website.name.toUpperCase()} EXPIRY DATE`,
          // text: `Hello ${website.contact_person}, hope all is fine.`,
          html: `
    <div>
      <h1>Hi ${website.contact_person},</h1>
      <p>We noticed that your website (byteofhope.com) will soon expire. Please try to update it to make sure that it stays up and running</p>

      <br />
      <br />

      <footer>
        <p>Regards,</p>
        <p><b>ShineAfrika Team</b></p>
        <a href="https://shineafrika.com/">
          www.shineafrika.com
        </a>
      </footer>
    </div>`,
        },
        (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        }
      );

      client.SMS.send({
        to: `+256${website.telephone_number}`,
        message: `Your website ${website.name.toUpperCase()} (${
          website.website_link
        }) will expiry in a day. Please make payment to reupdate it.`,
      })
        .then((response) => res.status(200).json(response))
        .catch((error) => res.status(503).json(error));
    });

  req.body?.week &&
    req.body?.week.forEach((website, index) => {
      client.SMS.send({
        to: `+256${website.telephone_number}`,
        message: `Your website ${website.name.toUpperCase()} (${
          website.website_link
        }) will expiry in a week. Please make payment to reupdate it.`,
      })
        .then((response) => res.status(200).json(response))
        .catch((error) => res.status(503).json(error));
    });

  req.body?.month &&
    req.body?.month.forEach((website, index) => {
      client.SMS.send({
        to: `+256${website.telephone_number}`,
        message: `Your website ${website.name.toUpperCase()} (${
          website.website_link
        }) will expiry in a month. Please make payment to reupdate it.`,
      })
        .then((response) => res.status(200).json(response))
        .catch((error) => res.status(503).json(error));
    });


  req.body?.two_months &&
    req.body?.two_months.forEach((website, index) => {
      client.SMS.send({
        to: `+256${website.telephone_number}`,
        message: `Your website ${website.name.toUpperCase()} (${
          website.website_link
        }) will expiry in a 60 days. Please make payment to reupdate it.`,
      })
        .then((response) => res.status(200).json(response))
        .catch((error) => res.status(503).json(error));
    });

 
}
