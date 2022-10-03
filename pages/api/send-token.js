const axios = require("axios");

const { PATASENTE_APIKEY, PATASENTE_GATEWAY_KEY, BASE_URL } = process.env;

const handler = async (req, res) => { 
  try {
    const results = await axios.post(
      `https://patasente.me/phantom-api/send-transaction-token/${PATASENTE_APIKEY}/${PATASENTE_GATEWAY_KEY}?phone=${req.body.phone}&mobile_money_company_id=1`,
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
