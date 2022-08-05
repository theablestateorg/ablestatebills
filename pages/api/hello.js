// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const  africastalking = require('africastalking')
require('dotenv').config()

const { AFRICASTALKING_USERNAME, AFRICASTALKING_APIKEY } = process.env

const client = africastalking({
    username: AFRICASTALKING_USERNAME,
    apiKey: AFRICASTALKING_APIKEY
});

export default function handler(req, res) {
  // console.log(req.body)
  // const result = {  
  //   day: [{id: 18,created_at:'2022-08-05T08:16:51.363114+00:00',name: 'example',website_link: 'example.com',      contact_person: 'James',telephone_number: 788934501,      status: 'active',last_paid: '2021-08-05T00:00:00',      expiry_date: '2022-08-05T00:00:00'}]
  // }

  req.body?.day.forEach((website, index) => {
    console.log('Phone number: ', `+256${website.telephone_number}\n`,'Email: ', `${website.email}`)
    console.log(`Your website ${website.name.toUpperCase()} (${website.website_link}) will expiry in a day. Please make payment to reupdate it.`)

    client.SMS.send({
      to: `+256${website.telephone_number}`,
      message: `Your website ${website.name.toUpperCase()} (${website.website_link}) will expiry in a day. Please make payment to reupdate it.`,
    })
    .then(response => res.status(200).json(response))
    .catch(error => res.status(503).json(error))
  })

  

  // const { day } = res.body

  
}

// handler("hey", "hello")
