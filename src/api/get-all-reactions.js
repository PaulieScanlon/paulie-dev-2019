const allReactionsUtil = require('../utils/get-all-reactions-util');

export default async function handler(req, res) {
  try {
    const response = await allReactionsUtil.get();

    res.status(200).json({ message: 'all reactions', data: response.data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
