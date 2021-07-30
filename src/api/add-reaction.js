const faunadb = require('faunadb')

export default async function handler(req, res) {
  const { slug, reaction } = req.body

  const q = faunadb.query

  const client = new faunadb.Client({ secret: process.env.GATSBY_FAUNA_KEY })

  try {
    await client.query(q.Create(q.Collection('reactions'), { data: { slug: slug, reaction: reaction } }))

    setTimeout(() => {
      res.status(200).json({ message: 'reaction added ok' })
    }, 2000)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
