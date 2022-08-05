// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  console.log(res)
  // const { day } = res.body
  res.status(200).json({
    body: "bingo"
  });
}
