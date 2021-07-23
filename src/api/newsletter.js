const axios = require('axios')

export default async function handler(request, response) {
  const { email } = request.body

  if (!email) {
    response.status(400).json({ message: 'No email address submitted' })
  } else {
    try {
      await axios.post(`https://api.convertkit.com/v3/forms/${process.env.CK_FORM_ID}/subscribe`, {
        api_key: process.env.CK_API_KEY,
        email: email,
      })

      response.status(200).json({ message: "You're all signed up -- Cheers!" })
    } catch (error) {
      response.status(500).json({
        message: error.message,
      })
    }
  }
}
