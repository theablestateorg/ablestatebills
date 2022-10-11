const axios = require("axios");

const handler = async (req, res) => {
  try{
    const result = await axios.post(`https://testapi.internet.bs/Domain/Create?ApiKey=testapi&Password=testpass&Domain=example.com&CloneContactsFromDomain=test-api-domain11.com`);

    res.json({"response": result.data});

  }
  catch (error){
    res.json({
      "result": error.message,
    });
  }

};

export default handler;