const faunadb = require('faunadb')

export default async function handler(req, res) {
  const q = faunadb.query

  const client = new faunadb.Client({ secret: process.env.FAUNA_KEY })

  try {
    const response = await client.query(
      q.Paginate(
        q.Match(
          q.Index(
            // `all_reactions_${process.env.NODE_ENV}`
            `all_reactions_production`,
          ),
        ),
      ),
    )

    const result = response.data.map(([ref, slug, reaction, date]) => ({
      ref: ref.id,
      slug,
      reaction,
      date,
    }))
    //   .reduce((items, item) => {
    //     const { slug, reaction } = item
    //     items[slug] = items[slug] || { slug: slug, reactions: [] }
    //     items[slug].reactions.push(reaction)
    //     return items
    //   }, {})

    // const post_by_amount = Object.keys(result).map((key) => {
    //   const counts = result[key].reactions.reduce((items, item) => {
    //     items[item] = items[item] || { name: item, count: 0 }

    //     if (items[item]) {
    //       items[item].count++
    //     }

    //     return items
    //   }, {})

    //   return {
    //     slug: result[key].slug,
    //     reactions: counts,
    //   }
    // })

    // console.log(JSON.stringify(result, null, 2))

    res.status(200).json({ message: 'All reactions', reactions: {} })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
