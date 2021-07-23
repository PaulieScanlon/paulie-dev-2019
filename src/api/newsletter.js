const axios = require('axios')

export default async function handler(req, res) {
  const { email } = req.body
  console.log(req.body)
  if (!email) {
    res.status(400).json({ message: 'Email is required' })
  } else {
    try {
      const endpoint = `https://api.convertkit.com/v3/forms/${process.env.CK_FORM_ID}/subscribe`
      await axios.post(endpoint, { email: email, api_key: process.env.CK_API_KEY })
      res.status(200).json({ message: "You're all signed up -- Cheers!" })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: error.message })
    }
  }
}
