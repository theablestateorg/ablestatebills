const axios = require("axios");

const { PATASENTE_APIKEY, PATASENTE_GATEWAY_KEY, BASE_URL } = process.env;

const handler = async (req, res) => { 
  try {
    const results = await axios.post(
      `https://patasente.me/phantom-api/pay-with-patasente/${PATASENTE_APIKEY}/${PATASENTE_GATEWAY_KEY}?email=davidwampamba@gmail.com&amount=2000&phone=${req.body.phone}
      &secret_code=${req.body.secret_code}&mobile_money_company_id=${req.body.mobile_money_company_id}&reason=${req.body.reason}&metadata=${req.body.metadata}`,
      req.body
    );
    res.json({
      "status": "Success",
      "message": results.data
    });
  } catch {
    res.json({
      result: "Failed",
    });
  }
}

export default handler;
