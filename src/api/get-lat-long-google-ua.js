const allLatLongGoogleUatil = require('../utils/get-lat-long-google-ua.util');

export default async function handler(req, res) {
  try {
    const response = await allLatLongGoogleUatil.get();

    res.status(200).json({ message: 'all ua-locations', data: response.data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
