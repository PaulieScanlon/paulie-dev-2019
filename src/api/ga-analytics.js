const gaAnalyticsUtil = require('../utils/ga-analytics-util');

export default async function handler(req, res) {
  try {
    const response = await gaAnalyticsUtil();

    res.status(200).json({ message: 'ga4 analytics', data: response.data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
