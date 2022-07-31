const allLocationsUtil = require('../utils/get-all-locations-util');

export default async function handler(req, res) {
  try {
    const response = await allLocationsUtil.get();

    res.status(200).json({ message: 'all locations', data: response.data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
