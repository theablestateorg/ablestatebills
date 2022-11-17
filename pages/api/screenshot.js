const puppeteer = require('puppeteer');


export default function handler(req, res) {
  const website_link = "nbkpremier.com"

  try{
    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(`https://${website_link}`);
      await page.screenshot({path: `screenshots/${website_link}.png`});
      await browser.close();
      // return res.send({"name": screenshot})
    })()
  } catch(error){
    res.send({"error": error})
  }
  res.send({"result": "end"})
}