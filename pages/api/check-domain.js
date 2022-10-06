const whoiser = require("whoiser");

const handler = async (req, res) => {
  const { domainName } = req.body;
  const onlyName = domainName.split(".")[0]

  // retrieve WHOIS info from Registrar WHOIS servers
  const domainWhois = await whoiser(domainName, { follow: 1 });

  // get for [.com, .org, .biz]
  // Start 
  // .com
  const domainWhoisCom = await whoiser(`${onlyName}.com`, { follow: 1 });
  const firstDomainWhoisCom = whoiser.firstResult(domainWhoisCom);
  const firstTextLineCom = (firstDomainWhoisCom.text[0] || "").toLowerCase();
  let domainAvailabilityCom = "unknown";

  if (firstTextLineCom.includes("reserved")) {
    domainAvailabilityCom = "reserved";
  } else if (
    firstDomainWhoisCom["Domain Name"] &&
    firstDomainWhoisCom["Domain Name"].toLowerCase() === `${onlyName}.com`
  ) {
    domainAvailabilityCom = "registered";
  } else if (firstTextLineCom.includes(`no match for ${onlyName}.com`)) {
    domainAvailabilityCom = "available";
  }

  // .org
  const domainWhoisOrg = await whoiser(`${onlyName}.org`, { follow: 1 });
  const firstDomainWhoisOrg = whoiser.firstResult(domainWhoisOrg);
  const firstTextLineOrg = (firstDomainWhoisOrg.text[0] || "").toLowerCase();
  let domainAvailabilityOrg = "unknown";

  if (firstTextLineOrg.includes("reserved")) {
    domainAvailabilityOrg = "reserved";
  } else if (
    firstDomainWhoisOrg["Domain Name"] &&
    firstDomainWhoisOrg["Domain Name"].toLowerCase() === `${onlyName}.org`
  ) {
    domainAvailabilityOrg = "registered";
  } else if (firstTextLineOrg.includes(`no match for ${onlyName}.org`)) {
    domainAvailabilityOrg = "available";
  }

  // .biz
  const domainWhoisBiz = await whoiser(`${onlyName}.biz`, { follow: 1 });
  const firstDomainWhoisBiz = whoiser.firstResult(domainWhoisBiz);
  const firstTextLineBiz = (firstDomainWhoisBiz.text[0] || "").toLowerCase();
  let domainAvailabilityBiz = "unknown";

  if (firstTextLineBiz.includes("reserved")) {
    domainAvailabilityBiz = "reserved";
  } else if (
    firstDomainWhoisBiz["Domain Name"] &&
    firstDomainWhoisBiz["Domain Name"].toLowerCase() === `${onlyName}.biz`
  ) {
    domainAvailabilityBiz = "registered";
  } else if (firstTextLineBiz.includes(`no match for ${onlyName}.biz`)) {
    domainAvailabilityBiz = "available";
  }



  // End

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
    return res.status(200).json({
      availability: domainAvailability,
      created_at: firstDomainWhois["Created Date"],
      expire_at: firstDomainWhois["Expiry Date"],
      server_name: firstDomainWhois["Name Server"],
      registrar: firstDomainWhois.Registrar,
      other: [
        {
          name: `${onlyName}.com`,
          availability: domainAvailabilityCom
        },
        {
          name: `${onlyName}.org`,
          availability: domainAvailabilityOrg
        },
        {
          name: `${onlyName}.biz`,
          availability: domainAvailabilityBiz
        }
      ]
    });;
  } else if (domainAvailability === "available") {
    return res.status(200).json({
      availability: domainAvailability,
      message: "This domain is available for registration right now",
      other: [
        {
          name: `${onlyName}.com`,
          availability: domainAvailabilityCom
        },
        {
          name: `${onlyName}.org`,
          availability: domainAvailabilityOrg
        },
        {
          name: `${onlyName}.biz`,
          availability: domainAvailabilityBiz
        }
      ]
    });
  }

  // console.log(domainAvailability)
  return res.status(200).json({ 
    availability: domainAvailability,
    other: [
      {
        name: `${onlyName}.com`,
        availability: domainAvailabilityCom
      },
      {
        name: `${onlyName}.org`,
        availability: domainAvailabilityOrg
      },
      {
        name: `${onlyName}.biz`,
        availability: domainAvailabilityBiz
      }
    ] 
  });
};

export default handler;
