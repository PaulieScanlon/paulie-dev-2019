const latestReactionsUtil = require('../utils/get-latest-reaction-util');

export default async function handler(req, res) {
  try {
    const response = await latestReactionsUtil.get();

    res.status(200).json({ message: 'latest reaction', data: response.data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
