// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  console.log(req)
  console.log("hey")
  res.status(200).json({
    body: req.body,
    query: req.query,
    cookies: req.cookies,
  });
}
