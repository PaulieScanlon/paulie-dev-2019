export default async function handler(req, res) {
  res.status(200).json({ message: 'ahoy', x: `${req.headers['x-forwarded-for']}` })
}
