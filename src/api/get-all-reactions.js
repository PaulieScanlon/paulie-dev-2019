const faunadb = require('faunadb')

export default async function handler(req, res) {
  const q = faunadb.query

  const client = new faunadb.Client({ secret: process.env.FAUNA_KEY })

  try {
    const response = await client.query(q.Paginate(q.Match(q.Index(`all_reactions_${process.env.NODE_ENV}`))))

    const result = response.data
      .map(([ref, slug, reaction, date]) => ({
        ref: ref.id,
        slug,
        reaction,
        date,
      }))
      .reduce((items, item) => {
        const { slug, reaction } = item
        items[slug] = items[slug] || { slug: slug, reactions: [] }
        items[slug].reactions.push(reaction)

        return items
      }, {})

    const reactions = Object.values(result)
      .sort((a, b) => b.reactions.length - a.reactions.length)
      .map((post) => {
        const { slug, reactions } = post
        return {
          slug,
          reactions: reactions
            .reduce((items, item) => {
              const existingItem = items.find((index) => index.name === item)

              if (existingItem) {
                existingItem.count += 1
              } else {
                items.push({ name: item, count: 1 })
              }
              return items
            }, [])
            .sort((a, b) => b.count - a.count),
        }
      })

    res.status(200).json({ message: 'reactions by slug', reactions: reactions })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
