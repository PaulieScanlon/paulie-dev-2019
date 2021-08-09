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
      .map((item) => {
        const { slug, reaction } = item

        return {
          reaction: reaction,
          slug: slug,
          count: 1,
        }
      })

      .reduce((items, item) => {
        const { slug, reaction } = item

        items[reaction] = items[reaction] || { icon: reaction, posts: [] }
        if (item.reaction === reaction) {
          items[reaction].posts.push(item)
        }
        return items
      }, {})

    const reactions_by_slug = Object.values(result)
      .map((post) => {
        const { icon, posts } = post

        return {
          icon: icon,
          posts: posts.reduce((items, item) => {
            const { slug, reactions } = item

            const existingItem = items.find((index) => index.slug === slug)

            if (existingItem) {
              existingItem.count += 1
            } else {
              items.push(item)
            }

            return items
          }, []),
        }
      })
      .reduce((items, item) => {
        const { icon } = item

        items[icon] = items[icon] || []
        items[icon].push(item.posts)

        return items
      }, {})

    //   .reduce((items, item) => {
    //     const { slug, reaction } = item
    //     items[slug] = items[slug] || { slug: slug, reactions: [] }
    //     items[slug].reactions.push(reaction)

    //     return items
    //   }, {})

    // const reactions = Object.values(result)
    //   .sort((a, b) => b.reactions.length - a.reactions.length)
    //   .map((post) => {
    //     const { slug, reactions } = post
    //     return {
    //       slug,
    //       reactions: reactions
    //         .reduce((items, item) => {
    //           const existingItem = items.find((index) => index.name === item)

    //           if (existingItem) {
    //             existingItem.count += 1
    //           } else {
    //             items.push({ name: item, count: 1 })
    //           }
    //           return items
    //         }, [])
    //         .sort((a, b) => b.count - a.count),
    //     }
    //   })

    res.status(200).json({ message: 'reactions by slug', reactions: reactions_by_slug })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
