const axios = require("axios");

const { INTERNETBS, INTERNETACCESS } = process.env;

const handler = async (req, res) => {
  try{
    const result = await axios.post(`https://api.internet.bs/Domain/Create?ApiKey=${INTERNETBS}&Password=${INTERNETACCESS}&Domain=${req.body.domain}&CloneContactsFromDomain=test-api-domain11.com`);

    res.json({"response": result.data});

  }
  catch (error){
    res.json({
      "result": error.message,
    });
  }

};

export default handler;