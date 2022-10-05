const whoiser = require("whoiser");
const axios = require("axios");

const handler = async (req, res) => {
  const { domainName } = req.body;

  // retrieve WHOIS info from Registrar WHOIS servers
  const domainWhois = await whoiser(domainName, { follow: 1 });

  const firstDomainWhois = whoiser.firstResult(domainWhois);
  const firstTextLine = (firstDomainWhois.text[0] || "").toLowerCase();

  let domainAvailability = "unknown";

  if (firstTextLine.includes("reserved")) {
    domainAvailability = "reserved";
  } else if (
    firstDomainWhois["Domain Name"] &&
    firstDomainWhois["Domain Name"].toLowerCase() === domainName
  ) {
    domainAvailability = "registered";
  } else if (firstTextLine.includes(`no match for "${domainName}"`)) {
    domainAvailability = "available";
  }

  if (domainAvailability === "registered") {
    res.status(200).json({
      availability: domainAvailability,
      created_at: firstDomainWhois["Created Date"],
      expire_at: firstDomainWhois["Expiry Date"],
      server_name: firstDomainWhois["Name Server"],
      registrar: firstDomainWhois.Registrar,
    });
    return null;
  } else if (domainAvailability === "available") {
    res.status(200).json({
      availability: domainAvailability,
      message: "This domain is available for registration right now",
    });
    return null;
  }

  // console.log(domainAvailability)
  res.status(200).json({ availability: domainAvailability });
  return null;
};

export default handler;
