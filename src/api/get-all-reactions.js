const faunadb = require('faunadb')

export default async function handler(req, res) {
  const q = faunadb.query

  const client = new faunadb.Client({ secret: process.env.FAUNA_KEY })

  try {
    const response = await client.query(q.Paginate(q.Match(q.Index(`all_reactions_${process.env.NODE_ENV}`))))

    console.log(response)

    res.status(200).json({ message: 'All reactions', reactions: response })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
