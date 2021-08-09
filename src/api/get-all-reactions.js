const faunadb = require('faunadb')
const { reactionsByAmount } = require('../utils/reactions-by-amount')

export default async function handler(req, res) {
  const q = faunadb.query

  const client = new faunadb.Client({ secret: process.env.FAUNA_KEY })

  try {
    const response = await client.query(q.Paginate(q.Match(q.Index(`all_reactions_production`))))

    const result = response.data.map(([ref, slug, reaction, date]) => ({
      ref: ref.id,
      slug,
      reaction,
      date,
    }))

    res.status(200).json({ message: 'reactions by slug', reactions: reactionsByAmount(result) })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
