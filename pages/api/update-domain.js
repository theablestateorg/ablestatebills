const axios = require("axios");

const handler = async (req, res) => {
  try{
    const result = await axios.post(`https://testapi.internet.bs/Domain/Update?ApiKey=testapi&Password=testpass&Domain=test-api-domain11.com&Registrant_Email=abc@test.com`);

    res.json({"response": result.data});

  }
  catch (error){
    res.json({
      "result": error.message,
    });
  }

};

export default handler;