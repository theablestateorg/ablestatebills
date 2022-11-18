const axios = require("axios");

const { PATASENTE_APIKEY, PATASENTE_GATEWAY_KEY, BASE_URL } = process.env;

const handler = async (req, res) => { 
  try {
    const results = await axios.post(
      `https://patasente.me/phantom-api/pay-with-patasente/${PATASENTE_APIKEY}/${PATASENTE_GATEWAY_KEY}?email=davidwampamba@gmail.com&amount=${req.body.amount}&phone=${req.body.phone}
      &secret_code=${req.body.secret_code}&mobile_money_company_id=${req.body.mobile_money_company_id}&reason=${req.body.reason}&metadata=${req.body.metadata}`,
      req.body
    );
    res.status(200).json({
      "status": "Success",
      "message": results.data
    });
  } catch(error) {
    res.status(404).json({
      "status": "Failed",
      "message": error.message,
    });
  }
}

export default handler;
