// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  console.log(req.body)
  console.log("response ", res)
  res.status(200).json({
    body: req.body
  });
}
