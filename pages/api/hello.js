// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const africastalking = require("africastalking");
require("dotenv").config();
const nodemailer = require("nodemailer");

const client = africastalking({
  username: process.env.AFRICASTALKING_USERNAME,
  apiKey: process.env.AFRICASTALKING_APIKEY,
});

export default function handler(req, res) {
  // console.log(req.body)
  // const result = {
  //   day: [{id: 18,created_at:'2022-08-05T08:16:51.363114+00:00',name: 'example',website_link: 'example.com',      contact_person: 'James',telephone_number: 788934501,      status: 'active',last_paid: '2021-08-05T00:00:00',      expiry_date: '2022-08-05T00:00:00'}]
  // }

  req.body?.day &&
    req.body?.day.forEach((website, index) => {
      console.log(
        "Phone number: ",
        `+256${website.telephone_number}\n`,
        "Email: ",
        `${website.email}`
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
}

// handler("hey", "hello")
