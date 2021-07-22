const axios = require('axios')
const yup = require('yup')

const validateEmail = async (email) => {
  const schema = yup.object().shape({
    email: yup.string().required().email(),
  })

  try {
    const validate = await schema.validate({ email: email })
    return validate
  } catch (error) {
    return error
  }
}

export default async function handler(request, response) {
  const { email } = request.body

  if (!email) {
    response.status(500).json({ message: 'No email address!' })
  } else {
    try {
      await validateEmail(email)

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
