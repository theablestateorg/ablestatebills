const axios = require("axios");

const handler = async (req, res) => {
  try{
    const result = await axios.post(`https://testapi.internet.bs/Domain/Renew?apiKey=testapi&password=testpass&domain=test-api-domain7.net&Period=1Y`);

    res.json({"response": result.data});

  }
  catch (error){
    res.json({
      "result": error.message,
    });
  }

};

export default handler;